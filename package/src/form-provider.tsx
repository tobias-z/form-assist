import * as React from "react"
import {useValidationContext} from "./form"
import type {Errors, Touched} from "./use-form"
import validateErrors from "./validate-errors"

type TFormContext = {
  values: Record<string, any>
  setValues: React.Dispatch<React.SetStateAction<any>>
  errors: Errors<any>
  setErrors: React.Dispatch<React.SetStateAction<Errors<any>>>
  touched: Touched<any>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  resetForm: () => void
  touchAllFields: () => void
}

const FormContext = React.createContext<TFormContext | null>(null)

function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("Form helpers were used outside of a the Form component")
  }
  return context
}

type Props = {
  formHelpers: TFormContext
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

function FormProvider({formHelpers, onSubmit, children, ...props}: Props) {
  const context = useValidationContext()
  const {setErrors, errors, setValues, values, touchAllFields} = formHelpers

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

        const newError = validateErrors({
          errors,
          newValue,
          setErrors,
          targetName,
          context,
        })
        setErrors({
          ...errors,
          [targetName]: newError,
        })
      },
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // I think submitting is kind of the same as touching all of the fields
    touchAllFields()

    // Validate errors before submit
    let newErrors: Record<string, any> = {}
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
      setErrors(newErrors)
    }

    // This should be values
    for (const [, value] of Object.entries(newErrors)) {
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
