import dbConnect from "../../../../config/dbConnect";
import Repo from "../../../../models/repo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect()

        const repos = await Repo.find().sort({ createdAt: -1 })

        return NextResponse.json({ repos })
    } catch (error) {

    }
}