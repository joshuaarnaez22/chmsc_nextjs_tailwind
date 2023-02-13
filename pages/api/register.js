import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { username, password, email, role, address } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const registerUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        role,
        profile: {
          create: {
            address,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    if (!registerUser) return res.send({ message: "Something went wrong" });

    delete registerUser["password"];
    return res.send({ registerUser });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return res.send({ message: "Email Already exists" });
    }
  }
}
