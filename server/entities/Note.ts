import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("notes")
export class Note {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 50, default: "untitled" })
	title: string;

	@Column("text", { default: "" })
	content: string;

	@ManyToOne(() => User, (user) => user.notes)
	user: User;
}
