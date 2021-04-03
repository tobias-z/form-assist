import * as React from "react"
import {useForm, Field, Form, useValidation} from "form-assist"

const initialValues = {
  name: "",
  phoneNumber: "",
}

function App() {
  const formHelpers = useForm(initialValues)
  const {values, resetForm, errors, touched} = formHelpers
  const validation = useValidation(values, {
    phoneNumber: {
      required: true,
    },
    name: {
      minCharacters: 6,
    },
  })
  const [friends, setFriends] = React.useState([])

  function handleSubmit(e) {
    e.preventDefault()
    setFriends([...friends, values])
    resetForm()
  }

  return (
    <div>
      <Form
        formHelpers={formHelpers}
        onSubmit={handleSubmit}
        validation={validation}>
        <Field name="name" />
        <Field type="number" name="phoneNumber" placeholder="phone" />
        <button>Add friend</button>
      </Form>
      <pre>{JSON.stringify(friends, null, 22)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <pre>{JSON.stringify(touched, null, 2)}</pre>
    </div>
  )
}

export default App
