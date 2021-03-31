<div align="center">
<h1>Form assist</h1>

<p>Create easy forms in react.</p>
</div>

---

<!-- prettier-ignore-start -->
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]
<!-- prettier-ignore-end -->

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

\_Looking to contribute? Any feedback is very appreciated.

### 🪲 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 🕯 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍.

[**See Feature Requests**][requests]
