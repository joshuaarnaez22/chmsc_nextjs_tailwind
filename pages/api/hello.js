// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
export default async function handler(req, res) {
  const alluser = await prisma.user.findFirst({
    where: { name: "joshua" },
  });

  res.status(200).json(alluser);
}
