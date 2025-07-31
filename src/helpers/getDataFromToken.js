import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request)=>{
    try {
        const token = request.cookies.get('token')?.value || ''

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        return decodedToken._id
    } catch {
        throw new Error('something went wrong')
    }
}