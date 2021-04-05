import * as React from "react"
import {Form, Field, useFormAssistStorage} from "form-assist/lib/index"

const initialValues = {
  name: "",
}

function App() {
  const {formHelpers, validation} = useFormAssistStorage(
    "test: my-key",
    initialValues,
    {
      name: {
        required: true,
      },
    }
  )
  const {values, resetForm} = formHelpers

  function handleSubmit(e) {
    e.preventDefault()
    console.log(values)
    resetForm()
  }

  return (
    <div>
      <Form
        formHelpers={formHelpers}
        validation={validation}
        onSubmit={handleSubmit}>
        <Field name="name" />
      </Form>
    </div>
  )
}

export default App
