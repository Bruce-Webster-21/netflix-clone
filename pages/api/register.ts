import bcryt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This only allows POST calls and will end if method is something else
  if (req.method !== "POST") {
    return res.status(405).end;
  }
  try {
    const { email, name, password } = req.body;
    // This checks if there is an email already in the database
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    // This ends the call is exisiting user exists
    if (existingUser) {
      return res.status(405).json({ error: "Email taken" });
    }

    const hashedPassword = await bcryt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(405).end;
  }
}
