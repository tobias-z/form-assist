import * as React from "react"
import {useFormContext} from "./form"

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

export default Field
