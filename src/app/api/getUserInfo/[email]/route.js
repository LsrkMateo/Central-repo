import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const email = params.email
    const user = await User.findOne({ email }).select("name email password stars");
    console.log(user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    // En caso de error, también debes devolver una respuesta para evitar el error.
    return NextResponse.json({ message: "noo", status: 400 });
  }
}
