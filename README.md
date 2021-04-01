<div align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<h1>Form assist</h1>

<p>Create easy forms in react. 🎉</p>
</div>

---

![documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![MIT](https://img.shields.io/npm/v/form-assist)
![version](https://img.shields.io/github/license/tobias-z/form-assist)

> Working process

## The problem

I have been using formik for a while now, and I really like it. My only problem
with it, was the fact that sometimes the forms would become hard for me, to wrap
my head around.

## The solution

Make all the values and errors available outside the JSX

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

Form assist also supports custom components through the _element_ property.

```jsx
const animals = [
  {id: Math.random(), value: "Cat"},
  {id: Math.random(), value: "Dog"},
]

return (
  <Field
    name="example"
    type="select"
    element={<SelectField />}
    options={animals}
  />
)
```

This will create **ALL** of your select and insert your array's, values as key's
or value respectively.

## Issues

Looking to contribute? Any feedback is very appreciated.

### 🪲 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**Create bug report**](https://github.com/tobias-z/form-assist/issues/new?assignees=&labels=&template=bug_report.md&title=)

### 🕯 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍.

[**Create Feature Requests**](https://github.com/tobias-z/form-assist/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://tobias-z.com"><img src="https://avatars.githubusercontent.com/u/70150300?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobias Zimmermann</b></sub></a><br /><a href="https://github.com/tobias-z/form-assist/commits?author=tobias-z" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!