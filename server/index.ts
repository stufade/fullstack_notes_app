import "reflect-metadata";
import "express-async-errors";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { __port__, __prod__ } from "./constants";
import notesRouter from "./routes/notes";
import authRouter from "./routes/auth";
import notFound from "./middlewares/not-found";
import errorHandler from "./middlewares/error-handler";

const main = async () => {
	const app = express();
	dotenv.config();
	await createConnection();

	app.use(cors());
	app.use(express.json());

	app.use("/api/notes", notesRouter);
	app.use("/api/auth", authRouter);

	app.use(notFound);
	app.use(errorHandler);

	app.listen(__port__, () => console.log(`listening on port ${__port__}`));
};

main();
