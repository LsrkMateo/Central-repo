import { connectMongoDB } from "../../../../../lib/mongodb";
import Repo from "../../../../../models/repo";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, description, author } = await req.json();

    // Crear el nuevo repositorio
    const newRepo = await Repo.create({ name, description, author });

    // Obtener el repositorio recién creado
    const repo = await Repo.findOne({ _id: newRepo._id }).select("_id name author description language repoStars createdAt updatedAt");

    // Actualizar el array user.proyects con toda la información del repositorio
    const user = await User.findOneAndUpdate(
      { name: author }, // Buscar el usuario por el autor del repositorio
      { $push: { proyects: repo } }, // Agregar toda la información del nuevo repositorio al array
      { new: true } // Devolver el documento actualizado
    );

    return NextResponse.json({ repo, user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "not found", status: 404 });
  }
}
