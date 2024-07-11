
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types/index"

export const NewPasswordView = () => {

  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)



  return (
    <>
        <h1 className="text-3xl font-black text-white text-center">Reestablecer Password</h1>

        {!isValidToken ? 
            <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> : 
            <NewPasswordForm token={token} />}
    </>
  )
}
