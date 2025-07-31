import { getDataFromToken } from "<@>/helpers/getDataFromToken";
import User from "<@>/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "<@>/db_config/dbConfig";

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findById(userId).select("-password")

        return NextResponse.json({
            message: "User found",
            user: user
        })
    } catch (error) {
        return NextResponse.json({error: error}, {status:400})
    }
}