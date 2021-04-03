import * as React from "react"
import {Field, Form, useFormAssist} from "form-assist"

const initialValues = {
  name: "",
}

function App() {
  const {formHelpers, validation} = useFormAssist(initialValues, {
    name: {
      required: true,
    },
  })
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
