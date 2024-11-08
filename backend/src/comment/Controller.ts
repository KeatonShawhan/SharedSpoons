import { Controller, Route, Request, Post, Query, Delete, Security, Get, Response} from 'tsoa';
import * as express from 'express';
import { CommentJSON, CommentReturn } from '.';
import { commentService } from './service'; // Comment service for handling comment creation
import { UUID } from '../types';
import { commentSchema } from './validator';

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
      @Query() postId: UUID,
    ): Promise<Comment[] | undefined> {
      return new commentService()
        .getComments(postId)
        .then((comment) => {
            if (comment === undefined) {
                this.setStatus(400);
                console.error('Could not delete comment');
                return undefined;
            }
            return comment;
        })
    }

    @Get("/getCommentCount")
    @Response("404", "User not found")
    public async getCommentsCount(
      @Query() postId: UUID,
    ): Promise<number | undefined> {
      return new commentService()
        .getCommentsCount(postId)
        .then((comment) => {
            if (comment === undefined) {
                this.setStatus(400);
                console.error('Could not delete comment');
                return undefined;
            }
            return comment;
        })
    }
}