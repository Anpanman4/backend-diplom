import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import moment from "moment";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "uploads/");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const date = moment().format("DDMMYYYY-HHmmss_SSS");
    callback(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploadMiddleware = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

export default uploadMiddleware;
