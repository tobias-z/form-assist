import * as React from "react"
import type {Errors} from "./use-form"

type FormContext = {
  values: Record<string, unknown>
  setValues: React.Dispatch<React.SetStateAction<unknown>>
  errors: Errors<unknown>
  setErrors: React.Dispatch<React.SetStateAction<Errors<unknown>>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
}

const FormContext = React.createContext<FormContext | null>(null)

function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("Form helpers were used outside of a the Form component")
  }
  return context
}

type FormProps = {
  formHelpers: FormContext
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

function Form({formHelpers, onSubmit, children, ...props}: FormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const {errors} = formHelpers
    for (const [, value] of Object.entries(errors)) {
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

export {Form, useFormContext}
