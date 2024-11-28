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
    DecodedToken,
  } from "./index";
  import { AuthService } from "./service";
  import type User from "./service";
  import jwt from 'jsonwebtoken';


  @Route("auth")
  export class AuthController extends Controller {
    private s3Service = new S3Service();

    @Post("/login")
    @Response("401", "Unauthorized")
    public async login(
      @Body() credentials: Credentials
    ): Promise<Authenticated | undefined> {
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
      if (!ret) {
        this.setStatus(409);
        console.log('Signup failed, returning 409.')
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
          if (account.pfp) {
            const newLink = await this.s3Service.getFileLink(account.pfp);
            if (newLink === undefined) {
              this.setStatus(400);
              return undefined;
            }
            account.pfp = newLink;
          }
          return account;
        })
        .catch(() => {
          this.setStatus(400);
          return undefined;
        });
    }
    
    @Get("/decodeToken")
    @Security('jwt')
    @Response("400", "Bad Request")
    @Response("401", "Unauthorized")
    public async decodeToken(
      @Request() request: express.Request
    ): Promise<DecodedToken | { message: string }> {
      const token = request.headers['authorization']?.split(' ')[1];
    
      if (!token) {
        this.setStatus(401);
        return { message: 'Token is required' };
      }
    
      try {
        const decoded = jwt.decode(token) as DecodedToken | null;
    
        if (!decoded) {
          this.setStatus(400);
          return { message: 'Invalid token' }; 
        }
    
        return decoded;
      } catch (error) {
        console.error(error);
        this.setStatus(500);  // Internal Server Error if there's an issue during decoding
        return { message: 'Failed to decode token' };  // Respond with error message
      }
    }
    
}
