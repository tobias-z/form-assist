import * as React from "react"

type CustomSelectProps = {
  children: React.ReactNode
  options: Array<{
    id: number | string
    value: string
  }>
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

type PropDrillerProps = {
  children: React.ReactNode
  name: string
  value: string
  onChange: unknown
  onBlur: unknown
}

type Select = {
  type: "select"
  name: string
  options: Array<{
    id: number | string
    value: string
  }>
  element?: JSX.Element
  className?: string
  style?: React.CSSProperties
}

type Textarea = {
  type: "textarea"
  name: string
  element?: JSX.Element
  placeholder?: string
  className?: string
  style?: React.CSSProperties
}

type Checkbox = {
  type: "checkbox"
  name: string
  element?: JSX.Element
  className?: string
  style?: React.CSSProperties
}

type TextField = {
  type?: "text" | "email" | "password" | "number"
  name: string
  element?: JSX.Element
  placeholder?: string
  className?: string
  style?: React.CSSProperties
}

type Radio = {
  type: "radio"
  name: string
  value: string
  element?: JSX.Element
  className?: string
  style?: React.CSSProperties
}

type FieldProps = Checkbox | Radio | Select | Textarea | TextField

export type {CustomSelectProps, PropDrillerProps, FieldProps}
