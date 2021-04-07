type TValidation<TValues> = {
  [key in keyof TValues]?: {
    required?: {
      is: boolean
      errorMessage: string
    }
    maxCharacters?: {
      is: number
      errorMessage: string
    }
    minCharacters?: {
      is: number
      errorMessage: string
    }
    email?: {
      is: true
      errorMessage: string
    }
  }
}

type Errors<TValues> = {
  [key in keyof TValues]?: string
}

type Touched<TValues> = {
  [key in keyof TValues]?: boolean
}

export type {TValidation, Errors, Touched}
