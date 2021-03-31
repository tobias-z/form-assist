import * as React from "react"

type FormContext = {
  values: Record<string, unknown>
  setValues: React.Dispatch<React.SetStateAction<unknown>>
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

type FormProps<FormHelpers> = {
  formHelpers: FormHelpers
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

function Form<FormHelpers>({
  formHelpers,
  onSubmit,
  children,
  ...props
}: FormProps<FormHelpers>) {
  return (
    <FormContext.Provider value={(formHelpers as unknown) as FormContext}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export {Form, useFormContext}
