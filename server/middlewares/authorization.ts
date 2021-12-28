import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

const authorization = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new CustomError("Auth failed", 401);
	}

	const token = authHeader.split(" ")[1];

	try {
		const { userId } = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as {
			userId: number;
		};

		const user = await getConnection().manager.findOne(User, {
			id: userId,
		});
		if (!user) {
			throw new CustomError("Auth failed", 401);
		}
		req.user = user;
		next();
	} catch (e) {
		throw new CustomError("Auth failed", 401);
	}
};

export default authorization;
