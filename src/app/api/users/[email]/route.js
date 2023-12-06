import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const email = params.email;
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({
        message: "Usuario no encontrado",
        status: 404, // Cambiado a 404 para indicar que el recurso no se encontró
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error al obtener el usuario",
      status: 500,
    });
  }
}
