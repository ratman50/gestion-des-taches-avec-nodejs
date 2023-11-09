import { config } from "./config/config";
import express, { Router } from "express";
import http from "http";
import Logging from "./library/Loggin";
import routeApi from "./routes/index";
import * as apiMiddleware from "./middleware/api-middleware";
import mongoose from "mongoose";
import passport, { session } from "passport";
const router = express();

// connect to Mongo
mongoose
     .connect(config.mongo.url, { retryWrites: true, w: "majority" })
     .then(() => {
          Logging.info("connected");
          StartServer();
     })
     .catch((error) => {
          Logging.error("Unable to connect");
          Logging.error(error);
     });
/**only start the server if Mongo connects */
const StartServer = () => {
     /**Log the request */
     router.use((req, res, next) => {
          /**log the request */
          Logging.info(
               `Incomming -> Method : [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}]`
          );

          res.on("finish", () => {
               /**Log the Response */
               Logging.info(
                    `Incomming -> Method : [${req.method}] - Url:[${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS:[${res.statusCode}]`
               );
          });
          next();
     });
     router.use(express.urlencoded({ extended: true }));
     router.use(express.json());

     /**Rules of your api */
     router.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
               "Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept, Authorization"
          );

          if (req.method == "OPTIONS") {
               res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
               return res.status(200).json({});
          }

          next();
     });
     /**Routes */
     router.use("/api", routeApi);

     /**healthCheck    */
     router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));
     /**Error handling */
     router.use((req, res, next) => {
          const error = new Error("not found");
          Logging.error(error);
          return res.status(404).json({ message: error.message });
     });

     /** for passport js authentication */
    
     router.use(passport.initialize());
     http.createServer(router).listen(config.server.port, () =>
          Logging.info(`Server is running   on port http://
localhost:${config.server.port}`)
     );
};
