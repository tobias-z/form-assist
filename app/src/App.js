import {useForm, Field, Form, useValidation} from "form-assist"
import Checkbox from "./components/checkbox"
import TextField from "./components/text-field"

function App() {
  const formHelpers = useForm({test: "", name: "", checkbox: false})
  const validation = useValidation(formHelpers.values, {
    name: {required: true, minCharacters: 5},
    test: {required: true, maxCharacters: 10},
    checkbox: {required: true},
  })

  return (
    <div>
      <h1>Hello world</h1>
      <Form
        formHelpers={formHelpers}
        validation={validation}
        onSubmit={e => {
          e.preventDefault()
          console.log(formHelpers.values)
          formHelpers.resetForm()
        }}>
        <Field name="test" element={<TextField />} />
        <Field name="name" element={<TextField />} />
        <Field name="checkbox" element={<Checkbox />} type="checkbox" />
        <pre>{JSON.stringify(formHelpers.errors, null, 2)}</pre>
        <button>Submit</button>
      </Form>
    </div>
  )
}

export default App
