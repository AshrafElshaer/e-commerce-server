import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import connectDatabase from "./config/connectToDB";
import { corsOptions } from "./config/corsOptions";
import { credentials } from "./config/credentials";
import { errorHandler } from "./middleweres/errorHandler";
import { logger } from "./middleweres/logEvents";
import {
  authRouter,
  usersRouter,
  ordersRouter,
  productsRouter,
} from "./routes";

dotenv.config();
const app = express();
connectDatabase();
const PORT = 4000;

// loging incoming requests
app.use(logger);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server");
});

// Auth Routes
app.use("/auth", authRouter);

//  Products Routes
app.use("/products", productsRouter);

// Orders Routes
app.use("/orders", ordersRouter);

// Users Routes
app.use("/users", usersRouter);

// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to database");
  app.listen(PORT, () => console.log(`server is listening on : ${PORT}`));
});
