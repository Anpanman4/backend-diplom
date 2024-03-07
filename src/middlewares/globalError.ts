import { Request, Response, NextFunction } from "express";

const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === 500 ? "На сервере произошла ошибка" : message,
  });

  next();
};

export default globalError;
