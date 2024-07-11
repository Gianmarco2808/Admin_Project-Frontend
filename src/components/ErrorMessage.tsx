import { ReactNode } from "react"

export const ErrorMessage = ({children} : {children : ReactNode}) => {
  return (
    <div className="text-red-500 text-sm font-semibold">
        {children}
    </div>
  )
}
