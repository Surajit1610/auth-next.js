import { connect } from "<@>/db_config/dbConfig";
import User from "<@>/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {password, rePassword, _id} = reqBody
        const user = await User.findById(_id)
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        if(password===rePassword){
            user.password = hashedPassword
            await user.save()
        }else{
            return NextResponse.json({error:"enter same password"})
        }

        return NextResponse.json({
            message: "password updated successfully",
            success: true
        })
        
    } catch (error) {
        return NextResponse.json({error: error}, {status:500})
    }
}