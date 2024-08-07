import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";

import routes from "../routes/index";
import globalError from "../middlewares/globalError";
import { corsMiddleWare } from "../middlewares/cors";
import bodyParser from "body-parser";
dotenv.config();

class App {
  public port: number;
  public host: string;

  private app: express.Application;

  constructor(port = 5000, host = "localhost") {
    this.port = parseInt(process.env.PORT!) || port;
    this.host = process.env.HOST || host;

    this.app = this.createApp();
  }

  private createApp(): express.Application {
    const app = express();

    app.use(corsMiddleWare);
    app.use(express.json({ limit: "2MB" }));
    app.use(express.urlencoded({ extended: true }));
    app.use("/uploads", express.static("uploads"));

    app.use("/api", routes);

    app.use(errors());
    app.use(globalError);

    mongoose
      .connect(
        `mongodb://127.0.0.1:27017/${
          process.env.NODE_ENV === "production"
            ? process.env.DATABASE_NAME
            : "diplom"
        }`
      )
      .then(() => console.log("DB working"));

    return app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Running server ${this.host}:${this.port}`);
    });
  }
}

export default App;
