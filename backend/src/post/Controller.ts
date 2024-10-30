import { Controller, Get, Route, Request, FormField, Post, Body, UploadedFile, Query, Delete, Put, Path} from 'tsoa';
import * as express from 'express';
import { S3Service } from '../s3/service'; // S3 service for handling uploads
import { postService } from './service'; // Post service for handling post creation
import { PostJSON, PostContent } from '.';

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
            // need to add some verification of the user's identity here
            const postData: PostContent = JSON.parse(post);

            if (postData === undefined) {
                this.setStatus(400);
                throw new Error('Invalid post data');
                return undefined;
            }



            const s3key = await this.s3Service.uploadFile(file);
            if (s3key === undefined) {
                this.setStatus(400);
                throw new Error('Could not upload file');
                return undefined;
            }

            postData.data.image = s3key;
            postData.data.time = new Date().toISOString();
            postData.data.adds = 0;

            return new postService()
                .createPost(postData)
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
        @Query() postID: string
    ): Promise< boolean | undefined > {
        try {
            return new postService()
                .deletePost(postID)
                .then(
                    async (deleted : boolean | undefined):
                        Promise<boolean | undefined> => {
                            if (!deleted) {
                                this.setStatus(400);
                                console.error('Could not delete post');
                                return undefined;
                            }
                            return deleted;
                        }
                )
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/delete route:', error);
            return false;
        }
    }

    @Get('postID/{postID}')
    public async getPost(
        @Path() postID: string

    ): Promise< PostContent | undefined > {
        try {
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

    @Get("/all")
    public async IDuserInfo(
    ): Promise<PostContent | undefined> {
        return new postService()
        .getAllPosts()
        .then(async (post: PostContent): Promise<PostContent> => {
            this.setStatus(200);
            return post;
          })
    }

}