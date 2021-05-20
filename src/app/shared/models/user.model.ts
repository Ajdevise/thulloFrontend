import { Board } from "./board.model";

export interface User {
    _id: string;
    username: string;
    email: string;
    image?: string;
    bio?: string;
    boards?: Array<Board>;
}