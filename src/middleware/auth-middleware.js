import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    const user = await prismaClient.userLoginData.findFirst({
      where: {
        token: token,
      },
      include: {
        userAccount: true,
      },
    });

    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
