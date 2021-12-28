import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";

const errorHandler = (
	error: CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.log(error);	

	res.status(error.statusCode || 500).json({ error: error.message });
};

export default errorHandler;
