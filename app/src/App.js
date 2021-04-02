import {useForm, Field, Form, useValidation} from "form-assist"
import Select from "./components/select"
import TextField from "./components/text-field"

function App() {
  const formHelpers = useForm({test: "", name: ""})
  const validation = useValidation(formHelpers.values, {
    name: {required: true},
  })

  const array = [
    {id: 1, value: "Cat"},
    {id: 2, value: "Dog"},
    {id: 3, value: "Horse"},
  ]

  return (
    <div>
      <h1>Hello world</h1>
      <button
        onClick={() =>
          formHelpers.setErrors({...formHelpers.errors, test: "No test"})
        }>
        Add error
      </button>
      <Form
        formHelpers={formHelpers}
        validation={validation}
        onSubmit={e => {
          e.preventDefault()
          console.log(formHelpers.values)
          formHelpers.resetForm()
        }}>
        <Field name="test" type="select" element={<Select />} options={array} />
        <p>{formHelpers.errors.name ? formHelpers.errors.name : null}</p>
        <Field name="name" element={<TextField />} />
        <pre>{JSON.stringify(formHelpers.errors, null, 2)}</pre>
        <button>Submit</button>
      </Form>
    </div>
  )
}

export default App
