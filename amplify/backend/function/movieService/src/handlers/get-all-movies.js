const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
  
    const movies = await prisma.movie.findMany()
    response.status(StatusCodes.OK);
    response.json({ data: movies });
  } catch (e) {

    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
