import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import User from "../models/user";

import { userBody } from "../types/userBody";

import SyntaxError from "../errors/syntaxError";
import AlreadyCreatedError from "../errors/alreadyCreatedError";
import AuthError from "../errors/authError";

import { JWT_SECRET_KEY } from "../utils/utils";
import { RequestWithUser } from "../types/reqWithUser";

dotenv.config();

class UserController {
  register = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName } = req.body;

    hash(password, 10)
      .then((hashedPassword) => {
        return { email, password: hashedPassword, firstName };
      })
      .then((body: userBody) => {
        User.create(body)
          .then((user) => {
            if (user) {
              res.status(201).send({ email, firstName });
            }
          })
          .catch((err) => {
            if (err.code === 11000) {
              return next(
                new AlreadyCreatedError(
                  "Пользователь с таким Email уже зарегистрирован"
                )
              );
            }
            if (err.name === "ValidationError") {
              return next(
                new SyntaxError(
                  "Переданы некорректные данные при создании пользователя."
                )
              );
            }
            return next(err);
          });
      })
      .catch(next);
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .select("+password")
      .then((user) => {
        if (!user) {
          return next(new AuthError("Пользователь не найден"));
        }
        compare(password, user.password)
          .then((isMatched: boolean) => {
            if (!isMatched)
              return next(new AuthError("Введен неправильный пароль"));

            const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET_KEY, {
              expiresIn: "12h",
            });

            res.send({ token: jwt });
          })
          .catch(next);
      })
      .catch(next);
  };

  getUsers = (req: RequestWithUser, res: Response, next: NextFunction) => {
    User.find({})
      .then((users) => {
        if (!users) return next(new SyntaxError("Пользователей не найдено"));
        return res.send(users);
      })
      .catch(next);
  };

  getUserById = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.params;
    User.findById(id)
      .then((user) => {
        if (!user)
          return next(new SyntaxError("Пользователь с таким id не найден"));
        res.send(user);
      })
      .catch((err) => {
        next(err);
      });
  };

  getMe = async (req: RequestWithUser, res: Response) => {
    const id = req?.user?._id;
    return res.send(await User.findById(id));
  };

  updateUserInfo = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const id = req?.user?._id;
    const { email, firstName } = req.body;
    User.findByIdAndUpdate(
      id,
      {
        email,
        firstName,
      },
      {
        new: true,
      }
    )
      .then((user) => {
        if (user) res.send(user);
      })
      .catch((err) => {
        if (err.name === "ValidationError")
          return next(
            new SyntaxError(
              "Переданы некорректные данные для обновления информации."
            )
          );
        if (err.codeName === "DuplicateKey")
          return next(new AlreadyCreatedError("Такой email уже занят"));
        return next(err);
      });
  };

  updateUserStatus = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const { email, status } = req.body;
    if (status) {
      return User.findOneAndUpdate(
        { email },
        { $addToSet: { roles: "Admin" } },
        { new: true }
      ).then((user) => res.send(user));
    }
    User.findOneAndUpdate(
      { email },
      { $pull: { roles: "Admin" } },
      { new: true }
    ).then((user) => res.send(user));
  };
}

const userController = new UserController();

export default userController;
