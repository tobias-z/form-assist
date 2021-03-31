import * as React from "react"

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

export {useForm}
