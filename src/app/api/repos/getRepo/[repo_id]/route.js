
import dbConnect from '../../../../../../utils/dbConnect';
import Repo from "../../../../../../models/repo";
import User from "../../../../../../models/user";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const id = await params.repo_id;
    const repo = await Repo.findById(id);
    console.log(repo);
    return NextResponse.json({ repo });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error al obtener el proyecto",
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const id = await params.repo_id;
    const repo = await Repo.findByIdAndRemove(params.repo_id);
    console.log(repo);
    return NextResponse.json({ repo });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error al obtener el proyecto",
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect(); // Establece una conexión a MongoDB

    const data = await req.json();
    const newName = data.name;
    const newDescription = data.description;
    const id = data.id; // Debes obtener el ID del documento que deseas actualizar desde la solicitud

    // Utiliza findByIdAndUpdate para actualizar el documento en la base de datos
    const updatedRepo = await Repo.findByIdAndUpdate(id, {
      name: newName,
      description: newDescription,
    });

    if (!updatedRepo) {
      // Si no se encuentra el documento, puedes retornar un mensaje de error
      return NextResponse.json(
        { message: "No se encontró el repositorio con el ID proporcionado." },
        404
      );
    }

    // Obtener el repositorio actualizado
    const repo = await Repo.findOne({ _id: updatedRepo._id }).select("_id name author description language repoStars createdAt updatedAt");

    // Actualizar el array user.proyects con toda la información del repositorio
    const user = await User.findOneAndUpdate(
      { name: updatedRepo.author }, // Buscar el usuario por el autor del repositorio
      { $pull: { proyects: { _id: updatedRepo._id } } }, // Retirar el antiguo repositorio del array
      { new: true }
    );

    // Agregar el repositorio actualizado al array
    await User.updateOne(
      { name: updatedRepo.author },
      { $push: { proyects: repo } }
    );

    return NextResponse.json({
      message: "El repositorio y el usuario han sido actualizados con éxito.",
    });
  } catch (error) {
    // Maneja los errores apropiadamente, ya sea registrándolos o retornando una respuesta de error
    console.error(error);
    return NextResponse.json(
      { message: "Se produjo un error al actualizar el repositorio y el usuario." },
      500
    );
  }
}