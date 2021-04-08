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
    value,
    onChange: handleChange,
    onBlur: handleBlur,
  }

  const errorInfo = {
    error,
    touched,
  }

  return {
    field,
    errorInfo,
  }
}

export default useField
