import {
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Note } from "./Note";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Length } from "class-validator";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	@Length(5, 20)
	name: string;

	@Column()
	password: string;

	@OneToMany(() => Note, (note) => note.user)
	notes: Note[];

	@BeforeInsert()
	async beforeInsert() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	async checkPassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}

	async createJWT() {
		return jwt.sign({ userId: this.id }, process.env.JWT_SECRET as string, {
			expiresIn: "7d",
		});
	}
}
