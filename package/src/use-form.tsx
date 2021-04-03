import * as React from "react"

type Errors<TValues> = {
  [key in keyof TValues]?: string
}

type Touched<TValues> = {
  [key in keyof TValues]?: boolean
}

function useForm<TValues>(initialValues: TValues) {
  function setInitialErrors() {
    let errors: Errors<TValues> = {}
    for (const key of Object.keys(initialValues)) {
      errors = {...errors, [key]: ""}
    }
    return errors
  }

  function setInitialTouched({isTouched}: {isTouched: boolean}) {
    let touched: Touched<TValues> = {}
    for (const key of Object.keys(initialValues)) {
      touched = {...touched, [key]: isTouched}
    }
    return touched
  }

  const [values, setValues] = React.useState<TValues>(initialValues)
  const [errors, setErrors] = React.useState<Errors<TValues>>(() =>
    setInitialErrors()
  )
  const [touched, setTouched] = React.useState<Touched<TValues>>(() =>
    setInitialTouched({isTouched: false})
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value
    if (e.target.type === "checkbox") {
      value = e.target.checked
    } else {
      value = e.target.value
    }
    setValues({...values, [e.target.name]: value})
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched({...touched, [e.target.name]: true})
  }

  function resetForm() {
    setValues(initialValues)
    setErrors(setInitialErrors())
    setTouched(setInitialTouched({isTouched: false}))
  }

  function touchAllFields() {
    setTouched(setInitialTouched({isTouched: true}))
  }

  const formHelpers = {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    touchAllFields,
  }

  return formHelpers
}

export type {Errors, Touched}
export {useForm}
