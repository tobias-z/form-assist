import * as React from "react"

type TValidation<TValues> = {
  [key in keyof TValues]?: {
    required?: boolean
    maxCharacters?: number
    minCharacters?: number
  }
}

function useValidation<TValues>(
  _formValues: TValues,
  validationOptions: TValidation<TValues>
) {
  const [validation] = React.useState<TValidation<TValues>>(validationOptions)

  return validation
}

export type {TValidation}
export {useValidation}
