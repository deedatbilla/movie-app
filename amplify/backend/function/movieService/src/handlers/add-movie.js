const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
    const { name, year, directorId } = request.body;
    const movie = await prisma.movie.create({
      data: {
        name,
        release_year: year,
        directorId,
      },
    });
    response.status(StatusCodes.CREATED);
    response.json({ data: { ...movie } });
  } catch (e) {
    error(e);
    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
