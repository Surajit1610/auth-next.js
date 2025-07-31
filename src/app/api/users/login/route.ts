import { connect } from "<@>/db_config/dbConfig";
import User from "<@>/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"



connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "user not found"}, {status:400})
        }

        //cheak password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
        return NextResponse.json({error: "invalid password"}, {status:401})
        }

        // create token
        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        
        const response = NextResponse.json({
            message: "Login successfully",
            success: true
        })

        response.cookies.set("token", token, {httpOnly: true})

        // console.log(response.cookies);
        

        return response
        
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
} 