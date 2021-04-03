import * as React from "react"

type PropDrillerProps = {
  children: React.ReactNode
  name: string
  value: string
  onChange: unknown
  onBlur: unknown
}

function PropDriller({children, ...props}: PropDrillerProps) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props)
    }
    return child
  })
  return <>{childrenWithProps}</>
}

export default PropDriller
