import { connectMongoDB } from "../../../../../lib/mongodb";
import Repo from "../../../../../models/repo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, author } = await req.json();
    const repo = await Repo.findOne({ name }).select("_id");
    console.log("Repo: ", repo);
    await Repo.create({ name, author });
    return NextResponse.json(
      { message: "Usuario registrado." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "not found", status: 404 });
  }
}
