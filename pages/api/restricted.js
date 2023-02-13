import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  //   const token = await getToken({ req });

  if (session) {
    res.send({
      content: "You are authenticated",
    });
  } else {
    res.send({
      content:
        "This is a restricted api you need to be authenticated to use it",
    });
  }
  res.end();
}
