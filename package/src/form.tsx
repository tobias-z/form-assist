import * as React from "react"
import type {TValidation} from "./use-validation"
import {TFormContext} from "./form-provider"
import {FormProvider} from "./form-provider"

type FormProps = {
  formHelpers: TFormContext
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  validation: TValidation<unknown>
  children: React.ReactNode
}

const ValidationContext = React.createContext<TValidation<unknown> | null>(null)
const useValidationContext = () => React.useContext(ValidationContext)

function Form({
  formHelpers,
  onSubmit,
  validation,
  children,
  ...props
}: FormProps) {
  return (
    <ValidationContext.Provider value={validation}>
      <FormProvider formHelpers={formHelpers} onSubmit={onSubmit} {...props}>
        {children}
      </FormProvider>
    </ValidationContext.Provider>
  )
}

export {Form, useValidationContext}
