const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
    const { name, year, id } = request.body;
    const movie = await prisma.movie.update({
      where: {
        id,
      },
      data: {
        name,
        release_year: year,
      },
    });
    response.status(StatusCodes.CREATED);
    response.json({ data: { ...movie } });
  } catch (e) {
    console.log(e)
    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
