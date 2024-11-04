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
  } from "tsoa";
  
  import {
    SentRequest
  } from "./index";

  import { FollowService } from "./service";
  import { UUID } from '../types';
  
  @Route("follow")
  export class FollowController extends Controller {
    @Post("/send")
    @Response("404", "User not found")
    public async add(
      @Body() receiver: UUID,
      @Request() req: Express.Request
    ): Promise<SentRequest | undefined> {
      if (!req.user) {
        this.setStatus(401);
        return;
      }
      return new FollowService()
        .add(req.user.id, receiver)
        .then(
          async (
            res: SentRequest | undefined
          ): Promise<SentRequest | undefined> => {
            if (!res) {
              this.setStatus(404);
            }
            return res;
          }
        );
    }
  
  }