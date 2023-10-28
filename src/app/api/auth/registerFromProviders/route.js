import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        await connectMongoDB()
        const { name, email } = await req.json();
        await User.create({ name, email });
        return NextResponse.json(
            { message: "Usuario registrado." },
            { status: 201 }
          );
    } catch (error) {
        return NextResponse.json(
            { message: "Se produjo un error al registrar el usuario." },
            { status: 400 }
          );
    }
}