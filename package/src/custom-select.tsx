import * as React from "react"

type CustomSelectProps = {
  children: React.ReactNode
  options: Array<{
    id: number | string
    value: string
  }>
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function CustomSelect({
  children,
  options,
  name,
  value,
  onChange,
  ...props
}: CustomSelectProps) {
  const selectWithOptions = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child,
        {name, value, onChange, ...props},
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

export default CustomSelect
