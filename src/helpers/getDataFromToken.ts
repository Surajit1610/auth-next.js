import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest)=>{
    try {
        const token = request.cookies.get('token')?.value || ''

        const decodedToken: object = jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken._id
    } catch {
        throw new Error('something went wrong')
    }
}