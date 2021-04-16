import * as React from "react"
import {render, screen, cleanup, fireEvent} from "@testing-library/react"
import Field from "../field"
import {useFormAssist} from "../use-form-assist"
import {Form} from "../form"

afterEach(cleanup)

function MyForm() {
  const {formHelpers} = useFormAssist({bob: "bob"})
  function handleSubmit() {
    formHelpers.resetForm()
  }

  return (
    <Form formHelpers={formHelpers} onSubmit={handleSubmit}>
      <label htmlFor="bob" />
      <Field name="bob" id="bob" aria-labelledby="bob" />
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
