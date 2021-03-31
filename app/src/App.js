import {useForm, Field, Form} from "form-assist"
import Select from "./components/select"

function App() {
  const formHelpers = useForm({test: ""})

  const array = [
    {id: 1, value: "Cat"},
    {id: 2, value: "Dog"},
    {id: 3, value: "Horse"},
  ]

  return (
    <div>
      <h1>Hello world</h1>
      <Form
        formHelpers={formHelpers}
        onSubmit={e => {
          e.preventDefault()
          console.log(formHelpers.values)
          formHelpers.resetForm()
        }}>
        <Field name="test" type="select" element={<Select />} options={array} />
        <button>Submit</button>
      </Form>
    </div>
  )
}

export default App
