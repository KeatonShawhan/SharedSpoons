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
    Request, 
    Security
    // Path
  } from "tsoa";
  
  import * as express from 'express';
  import { S3Service } from "../s3/service";
  import {
    Authenticated,
    Credentials,
    SessionUser,
    UserSignUp,
  } from "./index";
  import { AuthService } from "./service";
  import type User from "./service"

  @Route("auth")
  export class AuthController extends Controller {
    private s3Service = new S3Service();

    @Post("/login")
    @Response("401", "Unauthorized")
    public async login(
      @Body() credentials: Credentials
    ): Promise<Authenticated | undefined> {
      console.log(credentials);
      return new AuthService()
        .login(credentials)
        .then(
          async (
            account: Authenticated | undefined
          ): Promise<Authenticated | undefined> => {
            if (!account) {
              this.setStatus(401);
            }
            return account;
          }
        );
    }
  
    @Post("/signup")
    @Response("409", "Email/Username already in use")
    @SuccessResponse("201")
    public async signup(
      @Body() info: UserSignUp
    ): Promise<Authenticated | undefined> {
      const ret = await new AuthService().signup(info);
      console.log(ret);
      if (!ret) {
        this.setStatus(409);
        return undefined;
      }
      return this.login({username: info.username, password: info.password});
    }
  
    @Get()
    @Security('jwt')
    @Response("401", "Unauthorized")
    public async check(
      @Query() accessToken: string
    ): Promise<SessionUser | undefined> {
      return new AuthService()
        .check(accessToken)
        .then(async (account: SessionUser): Promise<SessionUser> => {
          return account;
        })
        .catch(() => {
          this.setStatus(401);
          return undefined;
        });
    }


    @Get("/userInfo")
    @Security('jwt')
    @Response("401", "Unauthorized")
    public async userInfo(
      @Request() request: express.Request,
      @Query() id: string
    ): Promise<User | undefined> {
      return new AuthService()
        .getUserInfo(id)
        .then(async (account: User | undefined): Promise<User |undefined> => {
          if (account === undefined) {
            console.log("Account is undefined");
            this.setStatus(400);
            return undefined;
          }
          const newLink = await this.s3Service.getFileLink(account.pfp);
          if (newLink === undefined) {
            this.setStatus(400);
            return undefined;
          }
          account.pfp = newLink;
          return account;
        })
        .catch(() => {
          this.setStatus(400);
          return undefined;
        });
    }
  }
