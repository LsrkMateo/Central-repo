import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  try {
    await connectMongoDB();
    const { name, email, password } = await req.json();

    if (!emailRegex.test(email) || !name || !password) {
      console.log("no listones");
      return NextResponse.json({
        message: "Datos de entrada inválidos",
        status: 400,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword });

      return NextResponse.json(
        { message: "Usuario registrado." },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Se produjo un error al registrar el usuario." },
      { status: 400 }
    );
  }
}
