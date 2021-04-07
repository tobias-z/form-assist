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

  const toReturn = {
    value,
    error,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
  }

  return toReturn
}

export default useField
