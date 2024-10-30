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
  } from "tsoa";
  
  import {
    Authenticated,
    Credentials,
    SessionUser,
    UserSignUp,
    SignUpRet,
    UserIdInfo,
  } from ".";
  import { AccountService } from "./service";
  
  @Route("auth")
  export class AccountController extends Controller {
    @Post("/login")
    @Response("401", "Unauthorized")
    public async login(
      @Body() credentials: Credentials
    ): Promise<Authenticated | undefined> {
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
      if (!ret) {
        this.setStatus(409);
        return undefined;
      }
      return this.login({username: info.username, password: info.password});
  
      // return ret;
    }
  
    @Get()
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
    @Response("401", "Unauthorized")
    public async userInfo(
      @Query() accessToken: string
    ): Promise<Authenticated | undefined> {
      return new AccountService()
        .userInfo(accessToken)
        .then(async (account: Authenticated): Promise<Authenticated> => {
          return account;
        })
        .catch(() => {
          this.setStatus(401);
          return undefined;
        });
    }
  
    @Get("/IDuserInfo")
    @Response("404", "Not Found")
    public async IDuserInfo(
      @Query() id: string
    ): Promise<UserIdInfo | undefined> {
      return new AccountService()
        .IDuserInfo(id)
        .then(async (account: UserIdInfo | undefined): Promise<UserIdInfo | undefined> => {
          if (!account) {
            this.setStatus(404);
          }
          return account;
        });
    }
  }