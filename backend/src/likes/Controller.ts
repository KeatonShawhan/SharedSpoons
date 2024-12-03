import { Controller, Route, Request, Post, Query, Delete, Security, Get} from 'tsoa';
import * as express from 'express';
import { postLiked } from './Index';
import { likeService } from './Service'; // Comment service for handling comment creation
import { UUID } from '../types/Index';

@Security('jwt')
@Route('likes')
export class LikesController extends Controller{
    @Post('/add')
  public async addLike(
        @Request() request: express.Request,
        @Query() post: UUID,
  ): Promise< postLiked | undefined > {
    try{
      if (!request.user) {
        this.setStatus(401);
        console.error('Unauthorized user');
        return undefined;
      }

      return new likeService()
        .addLike(request.user.id, post)
        .then((like) => {
          if (like === undefined) {
            this.setStatus(400);
            console.error('Could not add like');
            return undefined;
          }
          this.setStatus(201);
          return like;
        })
    } catch (error) {
      this.setStatus(500);
      console.error('Error adding like', error);
      return undefined;
    }
  }

    @Delete('/remove')
    public async removeLike(
        @Request() request: express.Request,
        @Query() post: UUID,
    ): Promise< boolean | undefined > {
      try{
        if (!request.user) {
          this.setStatus(401);
          console.error('Unauthorized user');
          return undefined;
        }

        return new likeService()
          .removeLike(request.user.id, post)
          .then((likeRemoved) => {
            if (likeRemoved === undefined) {
              this.setStatus(400);
              console.error('Could not remove like, service failure.');
              return undefined;
            }
            this.setStatus(204);
            return likeRemoved;
          })
      } catch (error) {
        this.setStatus(500);
        console.error('Error removing like', error);
        return undefined;
      }
    }

    @Get('/getLikeCount')
    public async getLikeCount(
        @Request() request: express.Request,
        @Query() post: UUID,
    ): Promise< number | undefined > {
      try{
        if (!request.user) {
          this.setStatus(401);
          console.error('Unauthorized user');
          return undefined;
        }
        return new likeService()
          .getLikeCount(post)
          .then((likeCount) => {
            if (likeCount === undefined) {
              this.setStatus(400);
              console.error('Could not get like count, service failure.');
              return undefined;
            }
            this.setStatus(200);
            return likeCount;
          })
      } catch (error) {
        this.setStatus(500);
        console.error('Error getting like count', error);
        return undefined;
      }
    }
}