import {useForm} from "./use-form"
import {useValidation} from "./use-validation"
import type {TValidation} from "./use-validation"

function useFormAssist<TValues>(
  initialValues: TValues,
  validationOptions: TValidation<TValues> = {}
) {
  const formHelpers = useForm(initialValues)
  const validation = useValidation(initialValues, validationOptions)
  return {formHelpers, validation}
}

export default useFormAssist
