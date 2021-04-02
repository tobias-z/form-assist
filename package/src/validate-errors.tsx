import type {Errors} from "./use-form"

type ValidationProps<TValidation> = {
  errors: Errors<unknown>
  setErrors: React.Dispatch<React.SetStateAction<Errors<unknown>>>
  targetName: string
  newValue: string | boolean
  context: TValidation
}

function validateErrors<TValidation>({
  errors,
  setErrors,
  targetName,
  newValue,
  context,
}: ValidationProps<TValidation>) {
  let error = ""
  if (context) {
    // Looping through the context values
    for (const [key, requirements] of Object.entries(context)) {
      if (key !== targetName) continue
      setErrors({
        ...errors,
        [key]: "",
      })
      if (typeof requirements === "object" && requirements !== null) {
        // Loop through each given validation type
        for (const [validationType, givenValue] of Object.entries(
          requirements
        )) {
          // Checking whether the field is required
          // If it is, does it have a value
          if (
            validationType === "required" &&
            givenValue === true &&
            !newValue
          ) {
            error = error
              ? error + ` This field is required.`
              : `This field is required.`
          }

          // Max charcters
          if (
            validationType === "maxCharacters" &&
            typeof givenValue === "number"
          ) {
            if (String(newValue).length > givenValue) {
              error = error
                ? error +
                  ` This field cannot be more than ${givenValue} charactors long.`
                : `This field cannot be more than ${givenValue} charactors long.`
            }
          }

          // Min charcters
          if (
            validationType === "minCharacters" &&
            typeof givenValue === "number"
          ) {
            if (String(newValue).length < givenValue) {
              error = error
                ? error +
                  ` This field cannot be less than ${givenValue} charactors`
                : `This field cannot be less than ${givenValue} charactors`
            }
          }
        }
      }
    }
  }
  return error
}

export default validateErrors
