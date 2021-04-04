import * as React from "react"
import {useFormContext} from "./form"
import type * as TForm from "./types"

function CustomSelect({
  children,
  options,
  name,
  value,
  onChange,
  onBlur,
  ...props
}: TForm.CustomSelectProps) {
  const selectWithOptions = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child,
        {name, value, onChange, onBlur, ...props},
        options.map(option => (
          <option key={option.id} value={option.value} {...props}>
            {option.value}
          </option>
        ))
      )
    }
    return child
  })

  return <>{selectWithOptions}</>
}

function PropDriller({children, ...props}: TForm.PropDrillerProps) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props)
    }
    return child
  })
  return <>{childrenWithProps}</>
}

function Field({name, element, ...props}: TForm.FieldProps) {
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
