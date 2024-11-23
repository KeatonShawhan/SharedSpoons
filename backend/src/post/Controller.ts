//Controller.ts
import { Controller, Get, Route, Request, FormField, Post, UploadedFile, Query, Delete, Put, Path, Security} from 'tsoa';
import * as express from 'express';
import { S3Service } from '../s3/service'; // S3 service for handling uploads
import { postService } from './service'; // Post service for handling post creation
import { PostJSON, PostContent, PostTotal } from '.';
import  {postDataSchema, editPostDataSchema}  from './validator';


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

            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
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
    ): Promise< PostTotal | undefined > {
        try {
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }
            return new postService()
                .getPost(postID, request.user.id)
                .then(
                    async (post : PostTotal | undefined):
                        Promise<PostTotal | undefined> => {
                            if (post === undefined) {
                                this.setStatus(400);
                                console.error('Could not get post');
                                return undefined;
                            }
                            const imageLink = await this.s3Service.getFileLink(post.data.image);
                            if (imageLink === undefined) {
                                this.setStatus(400);
                                console.error('Could not get image link for post:' + post.id);
                                return undefined;
                            }
                            post.data.image = imageLink;
    
                            const pfpKey = post.data.pfp;
                            if (!pfpKey || pfpKey.trim() === '') {
                                post.data.pfp = '';
                            } else {
                                const pfpLink = await this.s3Service.getFileLink(pfpKey);
                                if (pfpLink === undefined) {
                                    console.warn('Could not get pfp link for post:' + post.id);
                                    post.data.pfp = '';
                                } else {
                                    post.data.pfp = pfpLink;
                                }
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

    @Get('/all/{userID}')
    public async getAllPosts(
        @Request() request: express.Request,
        @Path() userID: string
    ): Promise<PostTotal[] | undefined> {
        console.log("userid: ", request.user);
        if (!request.user) {
            this.setStatus(401);
            console.error('Unauthorized user');
            return undefined;
        }
        try {
            return new postService()
                .getAllPosts(userID)
                .then(
                    async (posts: PostTotal[] | undefined): Promise<PostTotal[] | undefined> => {
                        console.log(posts);
                        if (!posts) {
                            this.setStatus(400);
                            console.error('Could not get posts');
                            return undefined;
                        }
                        for (let i = 0; i < posts.length; i++) {
                            const imageLink = await this.s3Service.getFileLink(posts[i].data.image);
                            if (imageLink === undefined) {
                                this.setStatus(400);
                                console.error('Could not get image link for post:' + posts[i].id);
                                return undefined;
                            }
                            posts[i].data.image = imageLink;
    
                            const pfpKey = posts[i].data.pfp;
                            if (!pfpKey || pfpKey.trim() === '') {
                                posts[i].data.pfp = '';
                            } else {
                                const pfpLink = await this.s3Service.getFileLink(pfpKey);
                                if (pfpLink === undefined) {
                                    console.warn('Could not get pfp link for post:' + posts[i].id);
                                    posts[i].data.pfp = '';
                                } else {
                                    posts[i].data.pfp = pfpLink;
                                }
                            }
                        }
                        this.setStatus(200);
                        return posts;
                    }
                );
        } catch (error) {
            this.setStatus(500);
            console.error('Error in post /post/all route:', error);
            return undefined;
        }
    }
    

    @Get('/all/friendsPosts/{userID}')
public async getFriendPosts(
    @Request() request: express.Request,
    @Path() userID: string,
    @Query() limit?: number,
    @Query() lastPostTime?: string
): Promise<PostTotal[] | undefined> {
    if (!request.user) {
        this.setStatus(401);
        console.error('Unauthorized user');
        return undefined;
    }

    try {
        const postServiceInstance = new postService();
        const posts = await postServiceInstance.getAllFriendsPosts(userID, limit, lastPostTime);

        if (!posts) {
            this.setStatus(400);
            console.error('Could not get posts');
            return undefined;
        }

        for (let i = 0; i < posts.length; i++) {
            const imageLink = await this.s3Service.getFileLink(posts[i].data.image);
            if (imageLink === undefined) {
                this.setStatus(400);
                console.error('Could not get image link for post:' + posts[i].id);
                return undefined;
            }
            posts[i].data.image = imageLink;

            const pfpKey = posts[i].data.pfp;
            if (!pfpKey || pfpKey.trim() === '') {
                posts[i].data.pfp = '';
            } else {
                const pfpLink = await this.s3Service.getFileLink(pfpKey);
                if (pfpLink === undefined) {
                    console.warn('Could not get pfp link for post:' + posts[i].id);
                    posts[i].data.pfp = '';
                } else {
                    posts[i].data.pfp = pfpLink;
                }
            }
        }
        this.setStatus(200);
        return posts;
    } catch (error) {
        this.setStatus(500);
        console.error('Error in /all/friendsPosts endpoint:', error);
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
            const { error } = editPostDataSchema.validate({rating, caption});
            if (error) {
                this.setStatus(400);
                console.error('Invalid edit data, failed verification', error);
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