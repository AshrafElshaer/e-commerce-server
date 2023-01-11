import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrgins";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin)
    if (origin === "http://localhost:5173" || origin === "http://127.0.0.1:4173") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

// allowedOrigins.includes(origin as string)