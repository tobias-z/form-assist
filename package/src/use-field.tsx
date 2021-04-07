import {useFormContext} from "./form"

function useField(fieldName: string) {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    setErrors,
    setValues,
    touched: allTouched,
  } = useFormContext()
  const value = values[fieldName] as string
  const error = errors[fieldName] as string
  const touched = allTouched[fieldName] as boolean

  const toReturn = {
    value,
    setValues,
    error,
    setErrors,
    touched,
    handleChange,
    handleBlur,
  }

  return toReturn
}

export default useField
