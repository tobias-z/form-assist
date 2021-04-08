import * as React from "react"
import {Form, Field, useFormAssist} from "form-assist/lib/index"
import TextField from "./components/text-field"

const initialValues = {
  name: "",
  lastName: "",
  email: "",
}

function App() {
  const {formHelpers, validation} = useFormAssist(initialValues, {
    name: {
      required: {
        is: true,
        errorMessage: "You have to give us your name",
      },
    },
    lastName: {
      minCharacters: {
        is: 10,
        errorMessage: "This is an error",
      },
    },
    email: {
      email: {
        is: true,
      },
    },
  })
  const {resetForm, values, errors} = formHelpers

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
        <TextField name="lastName" placeholder="Lastname" />
        <TextField name="email" placeholder="email" />
        <button type="submit">Submit</button>
      </Form>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </div>
  )
}

export default App
