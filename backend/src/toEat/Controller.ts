//Controller.ts
import { Controller, Get, Route, Request, Post, Query, Response, Security, Delete} from 'tsoa';
import * as express from 'express';
import {toEatService } from './service'; // Post service for handling post creation
import { PostTotal } from '../post';
import { S3Service } from '../s3/service';

@Security('jwt')
@Route('toEat')
export class ToEatController extends Controller {
    private s3Service = new S3Service();

    @Get("/getList")
    @Response("404", "User not found")
    public async getToEat(
      @Request() request: express.Request, 
    ): Promise<PostTotal[] | undefined> {
        try {
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }
            return new toEatService()
            .getToEatList(request.user.id)
            .then(async (list) => {
                if (list === undefined) {
                    this.setStatus(400);
                    console.error('Could not get toEat list');
                    return undefined;
                }
                for (let i = 0; i < list.length; i++) {
                    const imageLink = await this.s3Service.getFileLink(list[i].data.image);
                    if (imageLink === undefined) {
                        this.setStatus(400);
                        console.error('Could not get image link for image:', list[i].data.image);
                        return undefined;
                    }
                    list[i].data.image = imageLink;
                }
                return list;
            })
        } catch (error) {
            this.setStatus(500);
            console.error('Error in getting toEat list:', error);
            return undefined;
            
        }
      
    }

    @Post("/post")
    @Response("404", "User not found")
    public async postToEat(
      @Request() request: express.Request, 
      @Query() postId: string,
    ): Promise<{id:string} | undefined> {
        try {
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }
            return new toEatService()
            .postToEatList(request.user.id, postId)
            .then(async (id) => {
                if (id === undefined) {
                    this.setStatus(400);
                    console.error('Could not add to toEat list');
                    return undefined;
                }
                return id;
            })
        } catch (error) {
            this.setStatus(500);
            console.error('Error in adding to toEat list:', error);
            return undefined;
            
        }
      
    }

    @Delete('/delete')
    public async deleteFromToEat(
        @Request() request: express.Request,
        @Query() postId: string,
    ): Promise< boolean | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }

            return new toEatService()
                .deleteFromToEat(request.user.id, postId)
                .then(async (deleted) => {
                    if (deleted === undefined) {
                        this.setStatus(400);
                        console.error('Could not delete to eat post');
                        return undefined;
                    }
                    this.setStatus(204);
                    return true;
                })
        } catch (error) {
            console.error('Error deleting from toEat', error);
            this.setStatus(500);
            return undefined;
        }
    }

    @Get('/isInToEat')
    public async isInToEat(
        @Request() request: express.Request,
        @Query() postId: string,
    ): Promise< boolean | undefined > {
        try{
            if (!request.user) {
                this.setStatus(401);
                console.error('Unauthorized user');
                return undefined;
            }

            return new toEatService()
                .isInToEat(request.user.id, postId)
                .then(async (isIn) => {
                    if (isIn === undefined) {
                        this.setStatus(400);
                        console.error('Could not check if post is in to eat list');
                        return undefined;
                    }
                    return isIn;
                })
        } catch (error) {
            console.error('Error checking if post is in toEat', error);
            this.setStatus(500);
            return undefined;
        }
    }
}