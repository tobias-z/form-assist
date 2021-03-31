# Form assist

> Working process

## The problem

TBA

## The solution

TBA

## Installation

```
npm install --save form-assist
```

## Usage

```jsx
import {useForm, Form, Field} from "form-assist"

const initialValues = {
  example: "",
}

const formHelpers = useForm(initialValues)

function handleSubmit(event) {
  event.preventDefault()
  console.log(formHelpers.values)
}

return (
  <>
    <Form formHelpers={formHelpers} onSubmit={handleSubmit}>
      <Field name="example" />
    </Form>
  </>
)
```
