import { User } from "./user.model";
import { List } from './list.model';

export interface Board {
    title: string;
    owner?: User;
    description?: string;
    members?: Array<User>;
    cover: String;
    lists?: Array<List>
    visibility: "public" | "private";
    createdAt?: Date,
    updatedAt?: Date
}