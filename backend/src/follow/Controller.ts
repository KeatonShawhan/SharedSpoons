import {
    Body,
    Query,
    Controller,
    Post,
    Get,
    Delete,
    Response,
    Route,
    // Put,
    SuccessResponse,
    // Path
    Request,
    Security
  } from "tsoa";
  
  import {
    Account
  } from "./index";

  import { FollowService } from "./service";
  import { UUID } from '../types';
  import { SessionUser } from '../types';
  
  @Security('jwt', ['member'])
  @Route("follow")
  export class FollowController extends Controller {
    @Get("/getFollowers")
    @Response("404", "User not found")
    public async getFollowers(
      @Query() user: UUID,
    ): Promise<Account[] | undefined> {
      return new FollowService()
        .getFollowers(user)
        .then(
            async (
              res: Account[] | undefined
            ): Promise<Account[] | undefined> => {
              if (res) {
                // List of 'Account' type users
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
            res: Account[] | undefined
          ): Promise<Account[] | undefined> => {
            if (res) {
              // List of 'Account' type users
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