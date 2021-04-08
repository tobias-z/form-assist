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
        for (const [validationType, givenObject] of Object.entries(
          requirements
        )) {
          // Is the field required
          // Checking whether the field has an object of validationOptions
          // If it is, does it have a value
          if (
            validationType === "required" &&
            typeof givenObject === "object" &&
            givenObject !== null &&
            !newValue
          ) {
            let isRequired = false
            let errorMessage = ""
            for (const [optionKey, optionValue] of Object.entries(
              givenObject
            )) {
              if (optionKey === "is" && optionValue === true) {
                isRequired = true
              }
              if (
                optionKey === "errorMessage" &&
                typeof optionValue === "string"
              ) {
                errorMessage = optionValue
              }
            }

            // If there is an error we put the message on top of it, otherwise we just use this one
            if (isRequired && errorMessage) {
              error = error ? error + ` ${errorMessage}` : errorMessage
            } else if (isRequired) {
              error = error
                ? error + ` This field is required.`
                : `This field is required.`
            }
          }

          // Max charcters
          if (
            validationType === "maxCharacters" &&
            typeof givenObject === "object" &&
            givenObject !== null
          ) {
            let isError = false
            let maxCharactors: number | undefined = undefined
            let errorMessage = ""
            // Looping the options of validation
            for (const [optionKey, optionValue] of Object.entries(
              givenObject
            )) {
              // Each item in this loop is a validation option
              if (optionKey === "is" && typeof optionValue === "number") {
                // The new value in the form is too long
                if (String(newValue).length > optionValue) {
                  isError = true
                  maxCharactors = optionValue
                }
              } else if (
                optionKey === "errorMessage" &&
                typeof optionValue === "string" &&
                isError
              ) {
                errorMessage = optionValue
              }
            }

            // If an error was present we update the error string
            if (isError && maxCharactors && errorMessage) {
              error = error ? error + ` ${errorMessage}` : errorMessage
            } else if (isError) {
              error = error
                ? error +
                  ` This field cannot be more than ${maxCharactors!} characters long.`
                : `This field cannot be more than ${maxCharactors!} characters long.`
            }
          }

          // Min charcters
          if (
            validationType === "minCharacters" &&
            typeof givenObject === "object" &&
            givenObject !== null
          ) {
            let isError = false
            let minCharactors: number | undefined = undefined
            let errorMessage = ""
            // Looping the options of validation
            for (const [optionKey, optionValue] of Object.entries(
              givenObject
            )) {
              // Each item in this loop is a validation option
              if (optionKey === "is" && typeof optionValue === "number") {
                // The new value in the form is not long enough
                if (String(newValue).length < optionValue) {
                  isError = true
                  minCharactors = optionValue
                }
              } else if (
                optionKey === "errorMessage" &&
                typeof optionValue === "string" &&
                isError
              ) {
                errorMessage = optionValue
              }
            }

            // If an error happened we update the error string
            if (isError && minCharactors && errorMessage) {
              error = error ? error + ` ${errorMessage}` : errorMessage
            } else if (isError) {
              error = error
                ? error +
                  ` This field cannot be less than ${minCharactors!} characters.`
                : `This field cannot be less than ${minCharactors!} characters.`
            }
          }

          // Email validation
          if (
            validationType === "email" &&
            typeof givenObject === "object" &&
            givenObject !== null
          ) {
            let isError = false
            let errorMessage = ""
            // Each item in this loop is a validation option
            for (const [optionKey, optionValue] of Object.entries(
              givenObject
            )) {
              if (optionKey === "is" && typeof optionValue === "boolean") {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    String(newValue)
                  )
                ) {
                  // If the email is invalid we set isError to true
                  isError = true
                }
                // We are either using the given errorMessage or our own
              } else if (
                optionKey === "errorMessage" &&
                typeof optionValue === "string" &&
                isError
              ) {
                errorMessage = optionValue
              }
            }

            // If an error happend we update the error string
            if (isError && errorMessage) {
              error = error ? error + ` ${errorMessage}` : errorMessage
            } else if (isError) {
              error = error
                ? error + ` Invalid email address.`
                : `Invalid email address.`
            }
          }

          // Has to include validation
          if (
            validationType === "hasToInclude" &&
            typeof givenObject === "object" &&
            givenObject !== null
          ) {
            let isError = false
            let errorMessage = ""
            let whatToContain = ""
            for (const [optionKey, optionValue] of Object.entries(
              givenObject
            )) {
              if (optionKey === "is" && typeof optionValue === "string") {
                if (!String(newValue).includes(optionValue)) {
                  isError = true
                  whatToContain = optionValue
                }
              }

              if (
                optionKey === "errorMessage" &&
                typeof optionValue === "string" &&
                isError
              ) {
                errorMessage = optionValue
              }
            }

            // If an error happend we update the error string
            if (isError && errorMessage) {
              error = error ? error + ` ${errorMessage}` : errorMessage
            } else if (isError) {
              error = error
                ? error + ` This field has to contain: ${whatToContain}.`
                : `This field has to contain: ${whatToContain}.`
            }
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
    e.preventDefault()

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
        /* 
          Because of the way state works, we have to create a new object with the errors
          to be able to check if they exist in the forloop later
        */
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

    // If an error is currently active, we don't run the submit
    for (const value of Object.values(newErrors)) {
      if (value) return
    }

    // Run the users onSubmit function
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

export {Form, useFormContext}
