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
  supportRouter,
} from "./routes";

import verifyJWT from "./middleweres/verifyJWT";
import { allowedOrigins } from "./config/allowedOrgins";

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
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);

//middleware for cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server");
});

// Public Routes

// Auth Routes
app.use("/auth", authRouter);

// app.use(verifyJWT);
//  Categories Routes
app.use("/categories", categoriesRouter);

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
