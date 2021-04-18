import * as React from "react"
import {render, screen, cleanup, fireEvent} from "@testing-library/react"
import Field from "../field"
import {useFormAssist} from "../use-form-assist"
import {Form} from "../form"

afterEach(cleanup)

const ERROR_MESSAGE = "You need to have atleast 5 charectors in your field"

function MyForm() {
  const {formHelpers, validation} = useFormAssist(
    {bob: "bob"},
    {
      bob: {
        minCharacters: {
          is: 5,
          errorMessage: ERROR_MESSAGE,
        },
      },
    }
  )
  const {errors} = formHelpers

  function handleSubmit() {
    formHelpers.resetForm()
  }

  return (
    <Form
      formHelpers={formHelpers}
      validation={validation}
      onSubmit={handleSubmit}>
      <label htmlFor="bob" />
      <Field name="bob" id="bob" aria-labelledby="bob" />
      {errors.bob && <div id="error">{errors.bob}</div>}
      <button type="submit">submit</button>
    </Form>
  )
}

test("form is rendering correctly", () => {
  render(<MyForm />)
  expect(screen.getByLabelText(/bob/))
})

test("the field value is changing correctly", () => {
  render(<MyForm />)
  const bob = screen.getByLabelText(/bob/) as HTMLInputElement
  expect(bob.value).toBe("bob")
  fireEvent.change(bob, {target: {value: "bob the builder"}})
  expect(bob.value).toBe("bob the builder")
  fireEvent.click(screen.getByText(/submit/))
  expect(bob.value).toBe("bob")
})

test("validation of forms is working", () => {
  render(<MyForm />)
  const bob = screen.getByLabelText(/bob/) as HTMLInputElement

  fireEvent.click(screen.getByText(/submit/))
  expect(screen.getByText(ERROR_MESSAGE))
  fireEvent.change(bob, {target: {value: "more than 5"}})
  fireEvent.click(screen.getByText(/submit/))
  expect(bob.value).toBe("bob")
})
