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

function useForm<TValues>(initialValues: TValues) {
  const [values, setValues] = React.useState<TValues>(initialValues)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value
    if (e.target.type === "checkbox") {
      value = e.target.checked
    } else {
      value = e.target.value
    }
    setValues({...values, [e.target.name]: value})
  }

  function resetForm() {
    setValues(initialValues)
  }

  const formHelpers = {
    values,
    setValues,
    handleChange,
    resetForm,
  }

  return formHelpers
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

type Select = {
  type: "select"
  name: string
  options: Array<{
    id: number | string
    value: string
  }>
  className?: string
}

type Textarea = {
  type: "textarea"
  name: string
  className?: string
}

type Checkbox = {
  type: "checkbox"
  name: string
  className?: string
}

type TextField = {
  type?: "text"
  name: string
  className?: string
}

type Radio = {
  type: "radio"
  name: string
  value: string
  className?: string
}

type FieldProps = Checkbox | Radio | Select | Textarea | TextField

function Field({name, ...props}: FieldProps) {
  const {values, handleChange} = useFormContext()
  const value = values[name] as string

  if (props.type === "select") {
    return (
      <select
        name={name}
        value={value}
        onChange={
          (handleChange as unknown) as React.ChangeEventHandler<HTMLSelectElement>
        }>
        {props.options.map(option => (
          <option key={option.id} value={option.value} {...props}>
            {option.value}
          </option>
        ))}
      </select>
    )
  } else if (props.type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        {...props}
        onChange={
          (handleChange as unknown) as React.ChangeEventHandler<HTMLTextAreaElement>
        }
      />
    )
  } else {
    return (
      <input name={name} value={value} onChange={handleChange} {...props} />
    )
  }
}

export {useForm, Form, Field}
