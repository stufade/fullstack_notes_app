import 'express';
import { User } from "../entities/Note"

declare module 'express' {
  interface Request {
    user?: User;
  }
}