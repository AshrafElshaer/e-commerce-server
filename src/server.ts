import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";
import { errorHandler } from "./middleweres/errorHandler";
import { logger } from "./middleweres/logEvents";
import productsRouter from "./routes/products.route";
import ordersRouter from "./routes/orders.routes";
const app = express();
const PORT: string = process.env.PORT || "8080";

// loging incoming requests
app.use(logger);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware for cookies
// app.use(cookieParser());

app.get("/", (req, res) => {
  console.log(req.headers.origin);
  res.send("hello from server");
});

//  Products Routes
app.use("/products", productsRouter);

// Orders Routes
app.use("/orders", ordersRouter);

// Users Routes

// /users GET all users
// /users POST add new user
// /users/:id GET user by id
// /users/:id PUT user by id
// /users/:id DELETE user by id

// error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`server is listening on Port : ${PORT}`));
