import 'express';
import User from "./server/entities/Note"

declare module 'express' {
  interface Request {
    user?: User;
  }
}