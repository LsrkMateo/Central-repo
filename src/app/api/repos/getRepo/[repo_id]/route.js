import { connectMongoDB } from "../../../../../../lib/mongodb";
import Repo from "../../../../../../models/repo";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  try {
    await connectMongoDB();

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
    await connectMongoDB();

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
