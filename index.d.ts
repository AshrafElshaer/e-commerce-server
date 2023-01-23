import { VerifiedToken } from "./src/middleweres/verifyJWT";

declare global {
  namespace Express {
    interface Request {
      user?: VerifiedToken
    }
  }
}
