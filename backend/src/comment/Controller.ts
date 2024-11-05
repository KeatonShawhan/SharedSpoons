import { Controller, Get, Route, Request, FormField, Post, Body, UploadedFile, Query, Delete, Put, Path, Security} from 'tsoa';
import * as express from 'express';
import { CommentJSON } from '.';
import { commentService } from './service'; // Comment service for handling comment creation
import { UUID } from '../types';

@Security('jwt')
@Route('comment')
export class CommentController extends Controller{
    @Post('/create')
    public async createComment(
        @Request() request: express.Request,
        @Query() post: UUID,
        @Query() text: string,
    ): Promise< CommentJSON | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
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
}