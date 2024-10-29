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
    ): Promise< boolean | undefined > {
        try{
            // need to add some verification of the user's identity here
            const postData: PostContent = JSON.parse(post);

            if (postData === undefined) {
                this.setStatus(400);
                throw new Error('Invalid post data');
                return false;
            }



            const s3key = await this.s3Service.uploadFile(file);
            if (s3key === undefined) {
                this.setStatus(400);
                throw new Error('Could not upload file');
                return false;
            }

            postData.data.image = s3key;
            postData.data.time = new Date().toISOString();
            postData.data.adds = 0;

            return new postService()
                .createPost(postData)
                .then(
                    async (created : boolean | undefined):
                        Promise<boolean | undefined> => {
                            if (!created) {
                                this.setStatus(400);
                                throw new Error('Could not create post');
                                return false;
                            }
                            this.setStatus(201);
                            return created;
                        }
                )
            
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/create route:', error);
            throw new Error('Post creation failed in route /post/create');
            return false;
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
                                throw new Error('Could not delete post');
                                return false;
                            }
                            return deleted;
                        }
                )
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/delete route:', error);
            throw new Error('Post deletion failed in route /post/delete');
            return false;
        }
    }
    @Get('{postID}')
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
                                throw new Error('Could not get post');
                                return undefined;
                            }
                            return post;
                        }
                )
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/getPost route:', error);
            throw new Error('Post retrieval failed in route /post/getPost');
            return undefined;
        }
    }

}