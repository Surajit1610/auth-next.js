"use client"

import Link from "next/link"
import React, {useEffect} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const [buttonDisabeled, seteButtonDisabled] = React.useState(false)
        const [loadind, setLoading] = React.useState(false)

    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data);
            toast.success("Login success")
            router.push("/profile")
        } catch (error) {
            console.log("Login failed", error);
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
            if(user.email.length>0 && user.password.length>0){
                seteButtonDisabled(false)
            }else{
                seteButtonDisabled(true)
            }
        }, [user]
    )

    const forgotPassword = async ()=>{
        router.push("/forgotpassword")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-3 text-2xl">{loadind ? "processing" : "Login"}</h1>
            <hr />
           
            <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="email"
            value={user.email}
            placeholder="email"
            onChange={(e)=>setUser({...user, email: e.target.value})}
            />

            <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-gray-600"
            type="password"
            id="password"
            value={user.password}
            placeholder="password"
            onChange={(e)=>setUser({...user, password: e.target.value})}
            />

            <p
            className="mb-3 hover:text-blue-500 hover:cursor-pointer"
            onClick={forgotPassword}
            >Forgot password</p>

            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
            >{buttonDisabeled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit signup page</Link>
        </div>
    )
}