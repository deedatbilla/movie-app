const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
    const { id } = request.params;
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });
    response.status(StatusCodes.OK);
    response.json({ data: movie });
  } catch (e) {
    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
