import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isValidEmail } from "../../../../utils/isValidEmail";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });
    
    if (!email || !password || !name) {
      return NextResponse.json({
        message: "no se han llenado todos los campos del registro",
        status: 400,
      });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: " incorrect email ", status: 400 });
    }

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
