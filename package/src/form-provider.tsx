import * as React from "react"
import {useValidationContext} from "./form"
import type {Errors} from "./use-form"

type TFormContext = {
  values: Record<string, unknown>
  setValues: React.Dispatch<React.SetStateAction<unknown>>
  errors: Errors<unknown>
  setErrors: React.Dispatch<React.SetStateAction<Errors<unknown>>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
}

const FormContext = React.createContext<TFormContext | null>(null)

function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("Form helpers were used outside of a the Form component")
  }
  return context
}

type ValidationProps<TValidation> = {
  errors: Errors<unknown>
  setErrors: React.Dispatch<React.SetStateAction<Errors<unknown>>>
  targetName: string
  newValue: string | boolean
  context: TValidation
}

function validateErrors<TValidation>({
  errors,
  setErrors,
  targetName,
  newValue,
  context,
}: ValidationProps<TValidation>) {
  console.log({errors, setErrors, targetName, newValue, context})
  let error = ""
  if (context) {
    // Looping through the context values
    for (const [key, requirements] of Object.entries(context)) {
      if (key !== targetName) continue
      setErrors({
        ...errors,
        [key]: "",
      })
      if (typeof requirements === "object" && requirements !== null) {
        // Loop through each given validation type
        for (const [validationType, givenValue] of Object.entries(
          requirements
        )) {
          if (validationType === "required" && givenValue === true) {
            console.log(newValue)
            if (!newValue) {
              setErrors({
                ...errors,
                [key]: "This field is required",
              })
              error = "This field is required"
            }
          }
        }
      }
    }
  }
  return error
}

type Props = {
  formHelpers: TFormContext
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

function FormProvider({formHelpers, onSubmit, children, ...props}: Props) {
  const context = useValidationContext()
  const {setErrors, errors, setValues, values} = formHelpers

  if (context) {
    formHelpers = {
      ...formHelpers,
      handleChange: e => {
        let newValue
        const targetName = e.target.name
        if (e.target.type === "checkbox") {
          newValue = e.target.checked
        } else {
          newValue = e.target.value
        }
        setValues({...values, [targetName]: newValue})

        validateErrors({errors, newValue, setErrors, targetName, context})
      },
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Validate errors before submit
    let newErrors: Record<string, unknown> = {}
    if (context) {
      for (const [targetName, value] of Object.entries(values)) {
        let newValue = value
        if (!value) {
          newValue = ""
        }
        newErrors = {
          ...newErrors,
          [targetName]: validateErrors({
            errors,
            setErrors,
            newValue: newValue as string | boolean,
            targetName,
            context,
          }),
        }
      }
    }

    for (const [, value] of Object.entries(newErrors)) {
      console.log(value)
      if (value) {
        // If an error is currently active, we prevent the default and don't run the submit
        e.preventDefault()
        return
      }
    }
    onSubmit(e)
  }

  return (
    <FormContext.Provider value={formHelpers}>
      <form onSubmit={handleSubmit} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export type {TFormContext}
export {FormProvider, useFormContext, validateErrors}
