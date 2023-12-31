import dbConnect from "../../../../config/dbConnect";
import { NextResponse } from "next/server";
import User from "../../../../models/user";
export async function GET() {
    try {
        await dbConnect()

        const users = await User.find()
        return NextResponse.json({ users })

    } catch (error) {
        return NextResponse.json({ mesage: error })
    }
}