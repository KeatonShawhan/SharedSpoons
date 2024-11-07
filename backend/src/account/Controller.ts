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

  import {
    Authenticated,
    Credentials,
    SessionUser,
    UserSignUp,
  } from "./index";
  import { AccountService } from "./service";
  import type User from "./service"

  @Route("auth")
  export class AccountController extends Controller {
    @Post("/login")
    @Response("401", "Unauthorized")
    public async login(
      @Body() credentials: Credentials
    ): Promise<Authenticated | undefined> {
      console.log(credentials);
      return new AccountService()
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
      const ret = await new AccountService().signup(info);
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
      return new AccountService()
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
      return new AccountService()
        .getUserInfo(id)
        .then(async (account: User | undefined): Promise<User |undefined> => {
          return account;
        })
        .catch(() => {
          this.setStatus(401);
          return undefined;
        });
    }
  }
