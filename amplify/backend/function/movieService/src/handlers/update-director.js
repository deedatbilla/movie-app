const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
    const { firstName, lastName, id } = request.body;
    const movie = await prisma.director.update({
      where: {
        id,
      },
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
    response.status(StatusCodes.CREATED);
    response.json({ data: { ...movie } });
  } catch (e) {
    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
