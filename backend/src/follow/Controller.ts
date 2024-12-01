import {
    Query,
    Controller,
    Post,
    Get,
    Delete,
    Response,
    Route,
    // Put,
    // Path
    Request,
    Security
  } from "tsoa";
  
  import {
    Account,
    PfpAccount
  } from "./index";

  import { FollowService } from "./service";
  import { UUID } from '../types';
  import { S3Service } from "../s3/service"; // Import S3Service for signed URLs

  
  @Security('jwt', ['member'])
  @Route("follow")
  export class FollowController extends Controller {
    private s3Service = new S3Service();

    @Get("/getFollowers")
    @Response("404", "User not found")
    public async getFollowers(
      @Query() user: UUID,
    ): Promise<PfpAccount[] | undefined> {
      return new FollowService()
        .getFollowers(user)
        .then(
            async (
              res: PfpAccount[] | undefined
            ): Promise<PfpAccount[] | undefined> => {
              if (!res) {
                this.setStatus(404);
                return [];
              }
              for (let i = 0; i < res.length; i++) {
                const imageLink = await this.s3Service.getFileLink(res[i].pfp);
                if (imageLink === undefined) {
                    this.setStatus(400);
                    console.error('Could not get image link for post:' + res[i]);
                    return undefined;
                }
                res[i].pfp = imageLink;
              }
              return res;
            }
          );
    }

    @Get("/getFollowersCount")
    @Response("404", "User not found")
    public async getFollowersCount(
      @Query() user: UUID,
    ): Promise<number | undefined> {
      return new FollowService()
        .getFollowersCount(user)
        .then(
            async (
              res: number | undefined
            ): Promise<number | undefined> => {
              if (typeof res === 'number' && !isNaN(res)) {
                return res;
              }
              this.setStatus(404);
              return undefined;
            }
          );
    }

    @Get("/getFollowing")
    @Response("404", "User not found")
    public async getFollowing(
        @Query() user: UUID,
    ): Promise<Account[] | undefined> {
      return new FollowService()
        .getFollowing(user)
        .then(
          async (
            res: PfpAccount[] | undefined
          ): Promise<PfpAccount[] | undefined> => {
            if (!res) {
              this.setStatus(404);
              return [];
            }
            for (let i = 0; i < res.length; i++) {
              const imageLink = await this.s3Service.getFileLink(res[i].pfp);
              if (imageLink === undefined) {
                  this.setStatus(400);
                  console.error('Could not get image link for post:' + res[i]);
                  return undefined;
              }
              res[i].pfp = imageLink;
            }
            return res;
          }
        );
  }

    @Get("/getFollowingCount")
    @Response("404", "User not found")
    public async getFollowingCount(
      @Query() user: UUID,
    ): Promise<number | undefined> {
      return new FollowService()
        .getFollowingCount(user)
        .then(
            async (
              res: number | undefined
            ): Promise<number | undefined> => {
              if (typeof res === 'number' && !isNaN(res)) {
                return res;
              }
              this.setStatus(404);
              return undefined;
            }
          );
    }

    
    @Post("/send")
    @Response("404", "User not found")
    public async send(
      @Query() receiver: UUID,
      @Request() req: Express.Request
    ): Promise<boolean | undefined> {
      if (!req.user) {
        this.setStatus(401);
        return undefined;
      }
      return new FollowService()
        .send(req.user.id, receiver)
        .then(
          async (
            res: boolean
          ): Promise<boolean | undefined> => {
            if (!res) {
              this.setStatus(404);
              return false;
            }
            return res;
          }
        );
    }

    @Delete("/remove")
    @Response("404", "User not found")
    public async remove(
      @Query() receiver: UUID,
      @Request() req: Express.Request
    ): Promise<boolean | undefined> {
      if (!req.user) {
        this.setStatus(401);
        return undefined;
      }
      return new FollowService()
        .remove(req.user.id, receiver)
        .then(
          async (
            res: boolean
          ): Promise<boolean | undefined> => {
            if (!res) {
              this.setStatus(404);
              return false;
            }
            return res;
          }
        );
    }
  
  }