<div align="center">
<h1>Form assist</h1>

<p>Create easy forms in react. 🎉</p>
</div>

---

![documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![MIT](https://img.shields.io/npm/v/form-assist)
![version](https://img.shields.io/github/license/tobias-z/form-assist)

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

## Issues

Looking to contribute? Any feedback is very appreciated.

### 🪲 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**Create bug report**](https://github.com/tobias-z/form-assist/issues/new?assignees=&labels=&template=bug_report.md&title=)

### 🕯 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍.

[**Create Feature Requests**](https://github.com/tobias-z/form-assist/issues/new?assignees=&labels=&template=feature_request.md&title=)
