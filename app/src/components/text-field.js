import {useField} from "form-assist/lib/index"

function TextField({name, ...props}) {
  const {error, touched, ...field} = useField(name)
  const isError = error && touched ? error : null

  return (
    <>
      <input style={{color: "green"}} name={name} {...field} {...props} />
      {isError && isError}
    </>
  )
}

export default TextField
