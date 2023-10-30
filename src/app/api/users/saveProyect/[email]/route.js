import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../models/user";

//save proyect in user
export async function PUT(req, { params }) {
  try {
    await connectMongoDB();
    const proyect = await req.json();

    const email = params.email;
    const user = await User.findOne({ email });
    user.proyects.push(proyect);
    await user.save();

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" });
  }
}
