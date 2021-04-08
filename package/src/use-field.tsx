import {useFormContext} from "./form"

function useField(fieldName: string) {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched: allTouched,
  } = useFormContext()
  const value = values[fieldName] as string
  const error = errors[fieldName] as string
  const touched = allTouched[fieldName] as boolean

  const field = {
    name: fieldName,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
  }

  const info = {
    error,
    touched,
  }

  return {
    field,
    info,
  }
}

export default useField
