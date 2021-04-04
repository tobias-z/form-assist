import * as React from "react"
import type {Errors, Touched, TValidation} from "./use-form-assist"

type TFormContext = {
  values: Record<string, any>
  setValues: React.Dispatch<React.SetStateAction<any>>
  errors: Errors<any>
  setErrors: React.Dispatch<React.SetStateAction<Errors<any>>>
  touched: Touched<any>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  resetForm: () => void
  touchAllFields: () => void
}

type FormProviderProps = {
  formHelpers: TFormContext
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

type FormProps = {
  formHelpers: TFormContext
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  validation?: TValidation<unknown>
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

type ValidationProps<TValidation> = {
  errors: Errors<unknown>
  setErrors: React.Dispatch<React.SetStateAction<Errors<unknown>>>
  targetName: string
  newValue: string | boolean
  context: TValidation
}

export type {TFormContext, FormProviderProps, FormProps, ValidationProps}
