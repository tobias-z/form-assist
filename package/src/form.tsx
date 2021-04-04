import * as React from "react"
import type * as TForm from "./types"

function validateErrors<TValidation>({
  errors,
  setErrors,
  targetName,
  newValue,
  context,
}: TForm.ValidationProps<TValidation>) {
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
          // Checking whether the field is required
          // If it is, does it have a value
          if (
            validationType === "required" &&
            givenValue === true &&
            !newValue
          ) {
            error = error
              ? error + ` This field is required.`
              : `This field is required.`
          }

          // Max charcters
          if (
            validationType === "maxCharacters" &&
            typeof givenValue === "number"
          ) {
            if (String(newValue).length > givenValue) {
              error = error
                ? error +
                  ` This field cannot be more than ${givenValue} charactors long.`
                : `This field cannot be more than ${givenValue} charactors long.`
            }
          }

          // Min charcters
          if (
            validationType === "minCharacters" &&
            typeof givenValue === "number"
          ) {
            if (String(newValue).length < givenValue) {
              error = error
                ? error +
                  ` This field cannot be less than ${givenValue} charactors.`
                : `This field cannot be less than ${givenValue} charactors.`
            }
          }

          // Email validation
          if (
            validationType === "email" &&
            givenValue === true &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(String(newValue))
          ) {
            error = error
              ? error + ` Invalid email address.`
              : `Invalid email address.`
          }
        }
      }
    }
  }
  return error
}

const FormContext = React.createContext<TForm.TFormContext | null>(null)

function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("Form helpers were used outside of a the Form component")
  }
  return context
}

const ValidationContext = React.createContext<
  TForm.TValidation<unknown> | undefined
>(undefined)
const useValidationContext = () => React.useContext(ValidationContext)

function FormProvider({
  formHelpers,
  onSubmit,
  children,
  ...props
}: TForm.FormProviderProps) {
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

function Form({
  formHelpers,
  onSubmit,
  validation,
  children,
  ...props
}: TForm.FormProps) {
  return (
    <ValidationContext.Provider value={validation}>
      <FormProvider formHelpers={formHelpers} onSubmit={onSubmit} {...props}>
        {children}
      </FormProvider>
    </ValidationContext.Provider>
  )
}

export {Form, useValidationContext, useFormContext}
