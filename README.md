<div align="center">
<h1>Form assist</h1>
<p>Create easy forms in react. 🎉</p>
</div>

---

![documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
![MIT](https://img.shields.io/npm/v/form-assist)
![version](https://img.shields.io/github/license/tobias-z/form-assist)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
![npm](https://img.shields.io/npm/dm/form-assist)

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

### Basic example

```jsx
import {useFormAssist, Form, Field} from "form-assist"

const initialValues = {
  example: "",
}

const {formHelpers} = useFormAssist(initialValues)

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

<p>
<details><summary><strong>useFormAssist</strong></summary>

```jsx
import {useFormAssist} from "form-assist"

const initialValues = {
  example: "",
}

const {formHelpers, validation} = useFormAssist(
  initialValues,
  validationOptions
)
const {
  values,
  setValues,
  errors,
  setErrors,
  touched,
  handleChange,
  handleBlur,
  resetForm,
  touchAllFields,
} = formHelpers
```

## Validation

Form assist has validation build in, so you don't have to do any fancy things
yourself 🥳

All you have to do is provide a second parameter, to the useFormAssist hook.

```jsx
const {formHelpers, validation} = useFormAssist(initialValues, {
  example: {
    required: true,
    minCharacters: 5,
    maxCharacters: 10,
  },
})
```

All of this is typed, so it's really easy to figure out what you can pass to the
objects...

You will then have to provide the _validation_ object that is returned from the
useFormAssist hook, into your Form component's props like so:

```jsx
return <Form validation={validation}></Form>
```

And that's it! You now have validation on your fields.

## formHelpers

<p>
<details><summary><strong>values</strong></summary>

### Values

The values will the current state of the _initialValues_, that you passed to the
function

</details>
</p>

<p>
<details><summary><strong>setValues</strong></summary>

### setValues

The setValues function is given to you for flexability, if you for some reason
would like to set your form values, you can do that.

```jsx
const {values, setValues} = formHelpers

setValues({...values, example: "you have been modified"})
```

</details>
</p>

<p>
<details><summary><strong>errors</strong></summary>

### Errors

The errors object will be containing your initialValues object, but all strings.
If at any point these strings have a value, the form will not submit

</details>
</p>

<p>
<details><summary><strong>setErrors</strong></summary>

### setErrors

This function allows you to set an error on any given value, making it
impossible to submit unless resolved.

```jsx
const {errors, setErrors} = formHelpers

setErrors({...errors, example: "Unknown example!"})
```

</details>
</p>

<p>
<details><summary><strong>touched</strong></summary>

### touched

The touched object will hold the state of whether the fields have been touched
or not.

It can be very usefull together with the error state.

```jsx
const {errors, touched} = formHelpers

const isThouchedAndError = errors.example && touched.example
```

</details>
</p>

<p>
<details><summary><strong>handleChange</strong></summary>

### handleChange

Although not required in the Field component, the handleChange function can be
passed in any input field inside your form.

```jsx
const {values, handleChange} = formHelpers

return (
  <>
    <Form>
      <input name="example" value={values.example} onChange={handleChange}>
    </Form>
  </>
)
```

</details>
</p>

<p>
<details><summary><strong>handleBlur</strong></summary>

### handleBlur

This function will take care of setting a field to touched on blur.

```jsx
const {values, handleBlur} = formHelpers

return (
  <>
    <Form>
      <input name="example" value={values.example} onBlur={handleBlur}>
    </Form>
  </>
)
```

</details>
</p>

<p>
<details><summary><strong>resetForm</strong></summary>

### resetForm

the resetForm function will compleatly reset both your form and also any errors
that you may have.

```jsx
const {values, resetForm} = formHelpers

function handleSubmit(event) {
  e.preventDefault()
  console.log("YAY i exist!", values)
  resetForm()
  console.log("I have been reset 😿", values)
}
```

</details>
</p>

<p>
<details><summary><strong>touchAllFields</strong></summary>

### touchAllFields

If at any point you wish to make of the fields touched, this function can be
called, and it will do just that 👌

</details>
</p>

</details>
</p>

---

<p>
<details><summary><strong>useFormAssistStorage</strong></summary>

### Local Storage support

If you want your form to be persisted through local storage. The
**useFormAssistStorage** hook is exactly what you need.

It works exactly like **useFormAssist**, except you have to pass it a
local-storage key aswell.

```jsx
import {useFormAssistStorage} from "form-assist"

const {formHelpers, validation} = useFormAssistStorage(
  localStorageKey,
  initialValues,
  validationOptions
)
```

</details>
</p>

---

<p>
<details><summary><strong>Form</strong></summary>

### Form

The Form component is the way to bootstrap your form. Whenever you use a new
Form, it will need a few properties to function properly 💪

<p>
<details><summary><strong>formHelpers</strong></summary>

### formHelpers

The Form component needs to know which values, that it is working with..
Therefor, we pass it all of the formHelpers that you recieved whenever you
called `useFormAssist()`

```jsx
const {formHelpers} = useFormAssist(initialValues)

return <Form formHelpers={formHelpers}></Form>
```

</details>
</p>

<p>
<details><summary><strong>onSubmit</strong></summary>

### onSubmit

The onSubmit prop works just as a normal onSubmit, exept that before it is
called, it will check whether or not an error is pressent.

If no error is found, it will call your onSubmit.

```jsx
const {formHelpers} = useFormAssist(initialValues)

return (
  <Form
    formHelpers={formHelpers}
    onSubmit={e => console.log(formHelpers.values)}></Form>
)
```

</details>
</p>

<p>
<details><summary><strong>validation</strong></summary>

### validation

This is an object with error validation options.

Read more about this under the **useFormAssist** hook section

</details>
</p>

</details>
</p>

---

<p>
<details><summary><strong>Field</strong></summary>

### Field

The Field component is given to you, as an easy way to create fields of any
kind. You can use it effectively, by passing it a type property, which will
change which props needs to be given, for that specific type.

```jsx
return (
  <>
    <Field type="radio" name="example" value="I will be this value" />
    <Field type="radio" name="example" value="Another value" />
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

</details>
</p>

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

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://tobias-z.com"><img src="https://avatars.githubusercontent.com/u/70150300?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tobias Zimmermann</b></sub></a><br /><a href="https://github.com/tobias-z/form-assist/commits?author=tobias-z" title="Code">💻</a> <a href="https://github.com/tobias-z/form-assist/commits?author=tobias-z" title="Documentation">📖</a> <a href="#infra-tobias-z" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-tobias-z" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
