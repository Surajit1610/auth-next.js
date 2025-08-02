"use client"
import React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function ForgotPassword(){
    const router = useRouter()

    const [token, setToken] = React.useState("")
    const [isTokenAvl, setIsTokenAvl] = React.useState(false)
    const [user, setUser] = React.useState({ email: "" })
    const [buttonDisabeled, seteButtonDisabled] = React.useState(false)
    const [verified, setVerified] = React.useState(false)
    const [sended, setSended] = React.useState(false)
    const [passwords, setPasswords] = React.useState({
        password: "",
        rePassword: "",
        _id: ""
    })


    useEffect(()=>{
            if(user.email.length>0){
                seteButtonDisabled(false)
            }else{
                seteButtonDisabled(true)
            }
        }, [user.email]
    )

    useEffect(()=>{
        const urlToken = window.location.search.split('=')[1] || ""
        if(urlToken.length>0){
            setToken(urlToken)
            setIsTokenAvl(true)
        }
        
    })


    const verifyEmail = async ()=>{
        try {
            // console.log(token);
            
            const response = await axios.post("/api/users/verify", {token})
            console.log("Email verified successfully", response.data);

            setPasswords({...passwords, _id: response.data.userId})

            setVerified(true)
        } catch (error) {
            console.log("error while verifying", error)
        }
    }


    const verifyToResetPass = async ()=>{
        try {
            // console.log(user.email);
            
            const response = await axios.post("/api/users/verifyToResetPass", user)
            console.log("Email send successfully", response.data);
            
            setSended(true)
        } catch (error) {
            console.log(error);
        }
    }

    const resetPassword = async ()=>{
        try {
            const response = await axios.post("/api/users/resetpassword", passwords)
            console.log("password updated successfully",response.data);
            router.push("/login")
        } catch (error) {
            console.log("error while reseting passsword");
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {!isTokenAvl && !sended && (
                <div className="flex flex-col items-center">
                    <label htmlFor="email">Enter your Email</label>
                    <input 
                    type="email"
                    className="p-2 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:border-gray-600"
                    placeholder="Email"
                    onChange={(e)=>setUser({...user, email: e.target.value})}
                    />

                    {!buttonDisabeled && (
                        <div className="flex">
                            <button
                                onClick={verifyToResetPass}
                                className="p-2 border border-gray-300 rounded-md m-3 focus:outline-none focus:border-gray-600 hover:bg-blue-500"
                               >Verify Email
                            </button>
                        </div>
                    )}

                </div>
            ) }

            {sended && (
                <div className="flex flex-col items-center">
                    <h2>Check Your Email And Verify </h2>
                </div>
            )}


            {isTokenAvl && !verified && (
                <button
                onClick={verifyEmail}
                className="p-2 border border-gray-300 rounded-md m-3 focus:outline-none focus:border-gray-600 hover:bg-blue-500"
                >Verify Your Email</button>
            )}

            {verified && (
                <div className="flex flex-col items-center">
                    <label htmlFor="password">Enter Password</label>
                    <input
                    onChange={(e)=>setPasswords({...passwords, password: e.target.value})}
                    className="p-2 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:border-gray-600"
                    type="password"
                    placeholder="Password"/>

                    <label htmlFor="password">Re-enter Password</label>
                    <input
                    onChange={(e)=>setPasswords({...passwords, rePassword: e.target.value})}
                    className="p-2 border border-gray-300 rounded-md mt-2 mb-4 focus:outline-none focus:border-gray-600"
                    type="password"
                    placeholder="Password"/>

                    <button
                    className="p-2 border border-gray-300 rounded-md m-3 focus:outline-none focus:border-gray-600 hover:bg-blue-500"
                    onClick={resetPassword}
                    >Reset Pass</button>
                </div>
            )}
        </div>
    )
}