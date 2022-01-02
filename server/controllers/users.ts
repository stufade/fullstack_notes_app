import { Request, Response } from "express";

export const getUserName = (req: Request, res: Response) => {
    const { user } = req;

    res.json({ user: {name: user.name}});
}