import { Request, Response } from "express";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import CustomError from "../errors/CustomError";

export const register = async (req: Request, res: Response) => {
	const userRepository = getRepository(User);
	const { name, password } = req.body;

	const user = userRepository.create({
		name,
		password,
	});

	const errors = await validate(user);

	if (errors.length > 0) {
		const msg = Object.values(errors[0].constraints as {})[0] as string;
		throw new CustomError(msg, 400);
	}

	try {
		await userRepository.save(user);
	} catch {
		throw new CustomError("User already exists", 400);
	}

	const token = await user.createJWT();

	res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
	const userRepository = getRepository(User);
	const { name, password } = req.body;

	const user = await userRepository.findOne({ name });

	if (!user) {
		throw new CustomError("No user with this name", 400);
	}

	const isPasswordCorrect = await user.checkPassword(password);

	if (!isPasswordCorrect) {
		throw new CustomError("Wrong password", 400);
	}

	const token = await user.createJWT();

	res.json({ token });
};
