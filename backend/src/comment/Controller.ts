import { Controller, Route, Request, Post, Query, Delete, Security, Get, Response} from 'tsoa';
import * as express from 'express';
import { CommentJSON, CommentReturn } from '.';
import { commentService } from './service'; // Comment service for handling comment creation
import { UUID } from '../types';
import { commentSchema } from './validator';
import { S3Service } from '../s3/service';

interface Comment {
    data: {
      id: string;
      username: string;
      text: string;
      time: string;
    }
    firstname: string;
    lastname:string;
    pfp: string;
}

@Security('jwt')
@Route('comment')
export class CommentController extends Controller{
    private s3Service = new S3Service();
    
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
        @Query() commentID: UUID,
    ): Promise< boolean | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }

            return new commentService()
                .deleteComment(request.user.id, commentID)
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

    @Get("/getComments")
    @Response("404", "User not found")
    public async getComments(
        @Request() request: express.Request,
        @Query() postId: UUID,
    ): Promise<Comment[] | undefined> {
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user in getComments');
            return undefined;
        }

        try {
            const list = await new commentService().getComments(postId);
            if (list === undefined) {
                this.setStatus(400);
                console.error('List of comments is undefined');
                return undefined;
            }

            for (const comment of list) {
                const imageLink = await this.s3Service.getFileLink(comment.pfp);
                if (!imageLink) {
                    this.setStatus(400);
                    console.error('Could not get image link for image:', comment.pfp);
                    return undefined;
                }
                comment.pfp = imageLink;
            }

            return list;
        } catch (error) {
            console.error('Error fetching comments:', error);
            this.setStatus(500);
            return undefined;
        }
    }

    @Get("/getCommentCount")
    @Response("404", "User not found")
    public async getCommentsCount(
        @Request() request: express.Request,
        @Query() postId: UUID,
    ): Promise<number | undefined> {
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user in getCommentCount');
            return undefined;
        }
      return new commentService()
        .getCommentsCount(postId)
        .then((comment) => {
            if (comment === undefined) {
                this.setStatus(400);
                console.error('Couldnt get comment count');
                return undefined;
            }
            return comment;
        })
    }
}