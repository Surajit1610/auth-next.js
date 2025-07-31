"use client"

import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage(){
    const [data, setData]= useState("nothing")

    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.user._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Profile</h1>
            <p>profile page:</p>
            <hr />
            <h2
            className="bg-orange-500 p-1 rounded"
            >{data==="nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout
            </button>
            <hr />
            <button
            onClick={getUserDetails}
            className="bg-green-600 hover:bg-green-800 text-white font-bold mt-4 py-2 px-4 rounded"
            >Get user details</button>
        </div>
    )
}