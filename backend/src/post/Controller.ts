//Controller.ts
import { Controller, Get, Route, Request, FormField, Post, Body, UploadedFile, Query, Delete, Put, Path, Security} from 'tsoa';
import * as express from 'express';
import { S3Service } from '../s3/service'; // S3 service for handling uploads
import { postService } from './service'; // Post service for handling post creation
import { PostJSON, PostContent } from '.';
import  postDataSchema  from './validator';


@Security('jwt')
@Route('post')
export class PostController extends Controller {
    private s3Service = new S3Service();

    @Post('/create')
    public async createPost(
        @Request() request: express.Request,
        @FormField() post: string,
        @UploadedFile() file: Express.Multer.File,
    ): Promise< string | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }

            const postData: PostJSON = JSON.parse(post);
            if (postData === undefined) {
                this.setStatus(400);
                console.error('Invalid post data, failed json parsing.');
                return undefined;
            }

            const { error } = postDataSchema.validate(postData, { allowUnknown: false });
            if (error) {
                this.setStatus(400);
                console.error('Invalid post data, failed verification', error);
                return undefined;
            }

            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                this.setStatus(400);
                console.error('Invalid file type');
                return undefined;
            }


            const s3key = await this.s3Service.uploadFile(file);
            if (s3key === undefined) {
                this.setStatus(400);
                console.error('Could not upload file');
                return undefined;
            }

            postData.image = s3key;
            postData.time = new Date().toISOString();
            const postInput: PostContent = {
                user: request.user.id,
                data: postData
            };

            return new postService()
                .createPost(postInput)
                .then(
                    async (postID : string | undefined):
                        Promise<string | undefined> => {
                            if (!postID) {
                                this.setStatus(400);
                                console.error('Could not create post');
                                return undefined;
                            }
                            this.setStatus(201);
                            return postID;
                        }
                )
            
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/create route:', error);
            return undefined;
        }
    }

    @Delete('/delete')
    public async deletePost(
        @Request() request: express.Request,
        @Query() postID: string
    ): Promise< boolean | undefined > {
        try {
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }
            return new postService()
                .deletePost(postID, request.user.id)
                .then(
                    async (deleted : boolean | undefined):
                        Promise<boolean | undefined> => {
                            if (!deleted) {
                                this.setStatus(400);
                                console.error('Could not delete post');
                                return undefined;
                            }
                            this.setStatus(200);
                            return deleted;
                        }
                )
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/delete route:', error);
            return undefined;
        }
    }

    @Get('postID/{postID}')
    public async getPost(
        @Request() request: express.Request,
        @Path() postID: string
    ): Promise< PostContent | undefined > {
        try {
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }
            return new postService()
                .getPost(postID)
                .then(
                    async (post : PostContent | undefined):
                        Promise<PostContent | undefined> => {
                            if (post === undefined) {
                                this.setStatus(400);
                                console.error('Could not get post');
                                return undefined;
                            }
                            const imageLink = await this.s3Service.getFileLink(post.data.image);
                            if (imageLink === undefined) {
                                this.setStatus(400);
                                console.error('Could not get image link');
                                return undefined;
                            }
                            post.data.image = imageLink;
                            this.setStatus(200);
                            return post;
                        }
                )
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/getPost route:', error);
            return undefined;
        }
    }

    @Get('/all/{userID}')
    public async getAllPosts(
        @Request() request: express.Request,
        @Path() userID: string
    ): Promise<PostContent | undefined> {
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user');
            return undefined;
        }
        try{
            return new postService()
        .getAllPosts(userID)
        .then(async (post: PostContent): Promise<PostContent | undefined> => {
            if (!post) {
                this.setStatus(400);
                console.error('Could not get posts');
                return undefined;
            }
            this.setStatus(200);
            return post;
          });
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/all route:', error);
            return undefined;
        }
    }

    @Put('/edit/{postID}')
    public async editPost(
        @Request() request: express.Request,
        @Path() postID: string,
        @Query() rating: number,
        @Query() caption: string,
    ): Promise< string | undefined > {
        try {
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }
            return new postService()
                .editPost(postID, rating, caption)
                .then(
                    async (edited : string | undefined):
                        Promise<string | undefined> => {
                            if (!edited) {
                                this.setStatus(400);
                                console.error('Could not edit post');
                                return undefined;
                            }
                            this.setStatus(200);
                            return edited;
                        }
                )
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/edit route:', error);
            return undefined;
        }
    }

}