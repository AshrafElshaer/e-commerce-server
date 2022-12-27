import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
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
  categoriesRouter,
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

// Public Routes

// Auth Routes
app.use("/auth", authRouter);

//  Categories Routes
app.use("/categories", categoriesRouter);

app.use(verifyJWT);
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
