import { validate } from "../validation/validation.js";
import {
  registerUserValidation,
  loginUserValidation,
} from "../validation/user-validation.js";
import { v1 as uuid, v4 as uuidv4 } from "uuid";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);
  // adding id (uuid) to user
  user.id = uuidv4();

  const countUser = await prismaClient.userLoginData.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password_salt = salt;
  user.password_hash = hashedPassword;

  const result = await prismaClient.userAccount.create({
    data: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
      phone: user.phone,
      user_login_data: {
        create: {
          id: user.id,
          email: user.email,
          password_hash: user.password_hash,
          password_salt: user.password_salt,
        }
      }
    },
    select: {
      user_login_data: {
        select: {
          email: true
        }
      },
      first_name: true,
      last_name: true
    }
  })

  return {
    email: result.user_login_data.email,
    name: result.first_name + ' ' + result.last_name
  }
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.userLoginData.findUnique({
    where: {
      email: loginRequest.email
    },
    select: {
      email: true,
      password_hash: true
    }
  });

  if (!user) {
    throw new ResponseError(401, "Username or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password_hash);
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password is wrong");
  }

  const token = uuid().toString();
  return prismaClient.userLoginData.update({
    where: {
      email: user.email
    },
    data: {
      token: token
    },
    select: {
      token: true
    }
  });
}

export default {
  register,
  login
}