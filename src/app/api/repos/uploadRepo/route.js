import { connectMongoDB } from "../../../../../lib/mongodb";
import Repo from "../../../../../models/repo";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, description, author } = await req.json();

    await Repo.create({ name, description, author });

    const repo = await Repo.findOne({ name }).select("_id name author description language repoStars createdAt updatedAt");

    return NextResponse.json({ repo });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "not found", status: 404 });
  }
}
