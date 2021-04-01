import {useForm, Field, Form} from "form-assist"
import Select from "./components/select"

function App() {
  const formHelpers = useForm({test: "", boolean: true})
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    resetForm,
  } = formHelpers
  console.log(formHelpers.errors)

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
        onSubmit={e => {
          e.preventDefault()
          console.log(formHelpers.values)
          formHelpers.resetForm()
        }}>
        <Field name="test" type="select" element={<Select />} options={array} />
        {formHelpers.errors.test && formHelpers.errors.test}
        <button>Submit</button>
      </Form>
    </div>
  )
}

export default App
