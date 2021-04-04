type TValidation<TValues> = {
  [key in keyof TValues]?: {
    required?: boolean
    maxCharacters?: number
    minCharacters?: number
    email?: boolean
  }
}

type Errors<TValues> = {
  [key in keyof TValues]?: string
}

type Touched<TValues> = {
  [key in keyof TValues]?: boolean
}

export type {TValidation, Errors, Touched}
