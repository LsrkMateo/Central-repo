import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const email = params.email;
    const user = await User.findOne({ email }).select(
      "name email password stars"
    );
    console.log(user);
    console.log(user.stars);
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error al obtener el usuario",
      status: 500,
    });
  }
}

// export async function PUT(req, { params }) {
//   try {
//     await connectMongoDB();
//     const starred = await req.json();

//     const updatedUser = await User.findOneAndUpdate(
//       params.email,
//       { $set: { stars: starred } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return NextResponse.json({
//         message: "Usuario no encontrado",
//         status: 404,
//       });
//     }

//     return NextResponse.json({ user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       message: "Error al actualizar el usuario",
//       status: 500,
//     });
//   }
// }
