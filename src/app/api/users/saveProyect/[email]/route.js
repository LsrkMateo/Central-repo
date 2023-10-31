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

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    const email = params.email;
    const user = await User.findOne({ email });
    const id = await req.json();

    try {
      const index = user.proyects.findIndex(
        (proyecto) => proyecto.resProyect.repo._id === id
      );
      if (index !== -1) {
        // Elimina el proyecto encontrando utilizando splice
        user.proyects.splice(index, 1);
        console.log("Proyecto eliminado con éxito.");
      } else {
        console.log(
          "No se encontró ningún proyecto con el valor deseado en .resProyect.repo._id"
        );
      }
    } catch (error) {
      console.log(error);
    }
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" });
    }
    await user.save();

    return NextResponse.json({ message: "Elemento eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error en la eliminación" });
  }
}
