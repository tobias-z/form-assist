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
  type?: "text" | "email" | "password" | "number"
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
  const {values, handleChange, handleBlur} = useFormContext()
  const value = values[name] as string

  switch (props.type) {
    case "select":
      if (element) {
        return (
          <CustomSelect
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={
              (handleBlur as unknown) as React.FocusEventHandler<HTMLSelectElement>
            }
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
            onBlur={handleBlur}
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
            onBlur={
              (handleBlur as unknown) as React.FocusEventHandler<HTMLTextAreaElement>
            }
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
            onBlur={handleBlur}
            {...props}>
            {element}
          </PropDriller>
        )
      } else {
        return (
          <input
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
        )
      }
  }
}

export default Field
