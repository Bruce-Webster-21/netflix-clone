import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);

    // This will retrieve the number of movies in the database
    const movieCount = await prismadb.movie.count();

    // Math.floor will round a number to a whole number
    // Math.random will create a random number between 0 & 1
    // This will created a random number (e.g. Math.floor(0.73 * 90 = 65.7) = 66)
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      // https://www.prisma.io/docs/orm/prisma-client/queries/pagination
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(405).end();
  }
}
