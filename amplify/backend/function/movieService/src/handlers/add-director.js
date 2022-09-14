const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { StatusCodes } = require("http-status-codes");
const handler = async ({ request, response }) => {
  try {
    const { firstName, lastName } = request.body;
    const director = await prisma.director.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    response.status(StatusCodes.CREATED);
    response.json({ data: { ...director } });
  } catch (e) {
   
    response.status(StatusCodes.UNPROCESSABLE_ENTITY);
    response.json(e);
  }
};

module.exports = { handler };
