import { connect } from "<@>/db_config/dbConfig";
import { sendEmail } from "<@>/helpers/mailer";
import User from "<@>/models/userModel"
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request){
    // try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(email);
        

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "user not found"}, {status:400})
        }
        console.log(user);
        

        await sendEmail({email, emailType: 'RESET', userId: user._id})

        return NextResponse.json({
            message: "Email send successfilly",
            success: true,
        })

    // } catch (error) {
    //     return NextResponse.json({message: "Failed to send email"},{status: 500})
    // }
}