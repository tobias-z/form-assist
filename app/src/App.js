import {useForm, Field, Form} from "form-assist"

function App() {
  const formHelpers = useForm({test: ""})

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
        <Field name="test" />
      </Form>
    </div>
  )
}

export default App
