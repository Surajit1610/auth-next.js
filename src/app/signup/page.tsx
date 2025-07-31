"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignupPage() {
    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabeled, seteButtonDisabled] = React.useState(false)
    const [loadind, setLoading] = React.useState(false)

    const onSingup = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login")
        } catch (error) {
            console.log('Signup failed', error);

        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.username.length>0 && user.email.length>0 && user.password.length>0){
            seteButtonDisabled(false)
        }else{
            seteButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-3 text-2xl">{loadind ? "processing" : "signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="username"
            value={user.username}
            placeholder="username"
            onChange={(e)=>setUser({...user, username: e.target.value})}
            />

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
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
            type="password"
            id="password"
            value={user.password}
            placeholder="password"
            onChange={(e)=>setUser({...user, password: e.target.value})}
            />
            <button
            onClick={onSingup}
            className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
            >{buttonDisabeled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}