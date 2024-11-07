import { Controller, Route, Request, Post, Query, Delete, Security} from 'tsoa';
import * as express from 'express';
import { CommentJSON, CommentReturn } from '.';
import { commentService } from './service'; // Comment service for handling comment creation
import { UUID } from '../types';
import { commentSchema } from './validator';

@Security('jwt')
@Route('comment')
export class CommentController extends Controller{
    @Post('/create')
    public async createComment(
        @Request() request: express.Request,
        @Query() post: UUID,
        @Query() text: string,
    ): Promise< CommentReturn | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }

            const { error } = commentSchema.validate({text: text });
            if (error) {
                this.setStatus(400);
                console.error('Invalid comment data');
                return undefined;
            }

            const commentData: CommentJSON = {
                text: text,
                time: new Date().toISOString(),
            };

            return new commentService()
                .createComment(request.user.id, post, commentData)
                .then((comment) => {
                    if (comment === undefined) {
                        this.setStatus(400);
                        console.error('Could not create comment');
                        return undefined;
                    }
                    this.setStatus(201);
                    return comment;
                })
        } catch (error) {
            console.error('Error creating comment', error);
            this.setStatus(500);
            return undefined;
        }
    }

    @Delete('/delete')
    public async deleteComment(
        @Request() request: express.Request,
        @Query() commentId: UUID,
    ): Promise< boolean | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }

            return new commentService()
                .deleteComment(request.user.id, commentId)
                .then((comment) => {
                    if (comment === undefined) {
                        this.setStatus(400);
                        console.error('Could not delete comment');
                        return undefined;
                    }
                    this.setStatus(204);
                    return true;
                })
        } catch (error) {
            console.error('Error creating comment', error);
            this.setStatus(500);
            return undefined;
        }
    }
}