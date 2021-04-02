import * as React from "react"
import CustomSelect from "./custom-select"
import {useFormContext} from "./form-provider"
import PropDriller from "./prop-driller"

type Select = {
  type: "select"
  name: string
  options: Array<{
    id: number | string
    value: string
  }>
  element?: JSX.Element
  className?: string
}

type Textarea = {
  type: "textarea"
  name: string
  element?: JSX.Element
  className?: string
}

type Checkbox = {
  type: "checkbox"
  name: string
  element?: JSX.Element
  className?: string
}

type TextField = {
  type?: "text" | "email" | "password"
  name: string
  element?: JSX.Element
  className?: string
}

type Radio = {
  type: "radio"
  name: string
  value: string
  element?: JSX.Element
  className?: string
}

type FieldProps = Checkbox | Radio | Select | Textarea | TextField

function Field({name, element, ...props}: FieldProps) {
  const {values, handleChange} = useFormContext()
  const value = values[name] as string

  switch (props.type) {
    case "select":
      if (element) {
        return (
          <CustomSelect
            name={name}
            onChange={handleChange}
            value={value}
            {...props}>
            {element}
          </CustomSelect>
        )
      } else {
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
      }
    case "textarea":
      if (element) {
        return (
          <PropDriller
            name={name}
            onChange={handleChange}
            value={value}
            {...props}>
            {element}
          </PropDriller>
        )
      } else {
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
      }
    default:
      if (element) {
        return (
          <PropDriller
            name={name}
            value={value}
            onChange={handleChange}
            {...props}>
            {element}
          </PropDriller>
        )
      } else {
        return (
          <input name={name} value={value} onChange={handleChange} {...props} />
        )
      }
  }
}

export default Field
