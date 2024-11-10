//Controller.ts
import { Controller, Get, Route, Request, Post, Query, Response, Security} from 'tsoa';
import * as express from 'express';
import {toEatService } from './service'; // Post service for handling post creation
import { PostTotal } from '../post';

@Security('jwt')
@Route('toEat')
export class ToEatController extends Controller {

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
            .then((list) => {
                if (!list) {
                    this.setStatus(400);
                    console.error('Could not get list');
                    return undefined;
                }
                return list;
            })
        } catch (error) {
            this.setStatus(500);
            console.error('Error in getting to eat list:', error);
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
            .then((list) => {
                if (!list) {
                    this.setStatus(400);
                    console.error('Could not get list');
                    return undefined;
                }
                return list;
            })
        } catch (error) {
            this.setStatus(500);
            console.error('Error in getting to eat list:', error);
            return undefined;
            
        }
      
    }


}