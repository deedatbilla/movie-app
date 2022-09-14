const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
    const { id } = request.params;
    const director = await prisma.director.findUnique({
      where: {
        id: Number(id),
      },
    });
    response.status(StatusCodes.OK);
    response.json({ data: director });
  } catch (e) {
    console.log(e);
    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
