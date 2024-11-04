import {
    Body,
    Query,
    Controller,
    Post,
    Get,
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
      @Request() req: Express.Request,
      @Request() user: SessionUser
    ): Promise<Account[] | undefined> {
      console.log(req.user);
      if (!user) {
        this.setStatus(401);
        return;
      }
      return new FollowService()
        .getFollowers(user.id)
        .then(
          async (
            res: Account[] | undefined
          ): Promise<Account[] | undefined> => {
            if (!res) {
              this.setStatus(404);
            }
            // List of 'Account' type users
            return res;
          }
        );
    }

    /*
    @Post("/send")
    @Response("404", "User not found")
    public async send(
      @Body() receiver: UUID,
      @Request() req: Express.Request
    ): Promise<Account | undefined> {
      if (!req.user) {
        this.setStatus(401);
        return;
      }
      return new FollowService()
        .send(req.user.id, receiver)
        .then(
          async (
            res: Account | undefined
          ): Promise<Account | undefined> => {
            if (!res) {
              this.setStatus(404);
            }
            return res;
          }
        );
    }
    */
  
  }