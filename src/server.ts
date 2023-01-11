import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/connectToDB";
import { credentials } from "./config/credentials";
import { errorHandler } from "./middleweres/errorHandler";
import { logger } from "./middleweres/logEvents";
import {
  authRouter,
  usersRouter,
  ordersRouter,
  productsRouter,
  categoriesRouter,
  supportRouter,
} from "./routes";

import verifyJWT from "./middleweres/verifyJWT";

dotenv.config();
const app = express();
connectDatabase();
const PORT = 8080;

// loging incoming requests
app.use(logger);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json({ limit: "100MB" }));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//middleware for cookies
app.use(cookieParser());

// Public Routes

// Auth Routes
app.use("/auth", authRouter);

app.use("/categories", categoriesRouter);

app.use(verifyJWT);
//  Categories Routes

//  Products Routes
app.use("/products", productsRouter);

// Orders Routes
app.use("/orders", ordersRouter);

// Users Routes
app.use("/users", usersRouter);

//Support
app.use("/support", supportRouter);

// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to database");
  app.listen(PORT, () => console.log(`server is listening on : ${PORT}`));
});
