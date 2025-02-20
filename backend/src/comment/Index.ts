import { UUID } from "../types/Index";

export interface CommentJSON {
    text: string;
    time: string;
}

export interface CommentReturn {
    id: UUID;
    user: UUID;
    comment: string;
    time: string;
}