import { connect } from "<@>/db_config/dbConfig";
import User from "<@>/models/userModel"
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);
        
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error:"invalid token"}, {status:500})
        }
        console.log(user);
        
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "user verified successfilly",
            success: true,
            userId: user._id
        })
    } catch (error) {
        return NextResponse.json({error: error}, {status:500})
    }
}