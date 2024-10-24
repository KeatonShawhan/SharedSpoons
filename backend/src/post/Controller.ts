import { Controller, Get, Route, Request, FormField, Post, Body, UploadedFile, Query} from 'tsoa';
import * as express from 'express';
import { S3Service } from '../s3/service'; // S3 service for handling uploads
import { postService } from './service'; // Post service for handling post creation
import { PostInput, PostContent } from '.';

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
            const postData: PostInput = JSON.parse(post);

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
}