import * as React from "react"
import type * as TForm from "./types"

function useValidation<TValues>(
  _formValues: TValues,
  validationOptions: TForm.TValidation<TValues>
) {
  const [validation] = React.useState<TForm.TValidation<TValues>>(
    validationOptions
  )

  return validation
}

function useForm<TValues>(
  initialValues: TValues,
  values: TValues,
  setValues: React.Dispatch<React.SetStateAction<TValues>>
) {
  function setInitialErrors() {
    let errors: TForm.Errors<TValues> = {}
    for (const key of Object.keys(initialValues)) {
      errors = {...errors, [key]: ""}
    }
    return errors
  }

  function setInitialTouched({isTouched}: {isTouched: boolean}) {
    let touched: TForm.Touched<TValues> = {}
    for (const key of Object.keys(initialValues)) {
      touched = {...touched, [key]: isTouched}
    }
    return touched
  }

  const [errors, setErrors] = React.useState<TForm.Errors<TValues>>(() =>
    setInitialErrors()
  )
  const [touched, setTouched] = React.useState<TForm.Touched<TValues>>(() =>
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

// This hook will be used by the users, to call both the useForm and useValidaion hook togeher
function useFormAssist<TValues>(
  initialValues: TValues,
  validationOptions: TForm.TValidation<TValues> = {}
) {
  const [values, setValues] = React.useState<TValues>(initialValues)
  const {
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    touchAllFields,
  } = useForm(initialValues, values, setValues)
  const validation = useValidation(initialValues, validationOptions)

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
  return {formHelpers, validation}
}

function useFormAssistStorage<TValues>(
  localStoageKey: string,
  initialValues: TValues,
  validationOptions: TForm.TValidation<TValues> = {}
) {
  const [values, setValues] = React.useState<TValues>(() => {
    return JSON.parse(
      window.localStorage.getItem(localStoageKey) ||
        JSON.stringify(initialValues)
    )
  })

  function deleteStorage() {
    window.localStorage.removeItem(localStoageKey)
  }

  React.useEffect(() => {
    // set local storage
    window.localStorage.setItem(localStoageKey, JSON.stringify(values))
  }, [values])

  const {
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    touchAllFields,
  } = useForm(initialValues, values, setValues)
  const validation = useValidation(initialValues, validationOptions)

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
    deleteStorage,
  }
  return {formHelpers, validation}
}

export {useFormAssist, useFormAssistStorage}
