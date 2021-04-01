import * as React from "react"

type Errors<TValues> = {
  [key in keyof TValues]?: string
}

function useForm<TValues>(initialValues: TValues) {
  const [values, setValues] = React.useState<TValues>(initialValues)
  const [errors, setErrors] = React.useState<Errors<TValues>>(() => {
    let errors = {...initialValues}
    for (const [key] of Object.entries(initialValues)) {
      errors = {...errors, [key]: ""}
    }
    return errors
  })

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
    errors,
    setErrors,
    handleChange,
    resetForm,
  }

  return formHelpers
}

export type {Errors}
export {useForm}
