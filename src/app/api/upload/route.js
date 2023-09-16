import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { NodeNextResponse } from "next/dist/server/base-http/node";

cloudinary.config({
  cloud_name: "dudftt5ha",
  api_key: "364637126334655",
  api_secret: "MXr1-ajRSqGHzpsq0oY2-Fnb_jA",
});
export async function POST(request) {
  const data = await request.formData();
  const image = data.get("file");
  if (image) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // guardar en un archivo
    // const filePath = path.join(process.cwd(), "public", image.name);
    // await writeFile(filePath, buffer);

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        })
        .end(buffer);
    });
  

    return NextResponse.json({
      message: "imagen subida",
      url: response.secure_url,
    });
  } else {
    return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
  }
}
