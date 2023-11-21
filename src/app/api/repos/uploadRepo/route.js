import dbConnect from '../../../../../config/dbConnect';
import Repo from '../../../../../models/repo';
import User from '../../../../../models/user';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    await dbConnect();  

    const formData = await req.formData();

    // Extraer variables del formData
    const name = formData.get('name');
    const description = formData.get('description');
    const author = formData.get('author');
    const image = formData.get('imageLink');


    // Crear el nuevo repositorio
    const newRepo = await Repo.create({ name, author, description, image_url: image });

    // Obtener el repositorio recién creado
    const repo = await Repo.findById(newRepo._id).select('_id name author description language repoStars image_url createdAt updatedAt');

    // Actualizar el array user.proyects con toda la información del repositorio
    const user = await User.findOneAndUpdate(
      { name: author }, // Buscar el usuario por el autor del repositorio
      { $push: { proyects: repo } }, // Agregar toda la información del nuevo repositorio al array
      { new: true } // Devolver el documento actualizado
    );

    return NextResponse.json({ repo, user });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'not found', status: 404 });
  }
}
