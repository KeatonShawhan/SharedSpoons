import { Controller, Route, Request, Post, Security, Body} from 'tsoa';
import * as express from 'express';
import { welcomeService } from './service';

@Route('welcome')
@Security('jwt')
export class WelcomeController extends Controller {
    @Post('/uploadData')
  public async uploadWelcomeData(
        @Request() request: express.Request,
        @Body() foodsPreferred: string[],
  ): Promise < boolean | undefined > {
    try{
      if(!request.user){
        this.setStatus(401);
        console.log('Error in welcome/uploadData: User not found or is unauthorized');
        return undefined;
      }
      return new welcomeService()
        .uploadData(request.user.id, foodsPreferred)
        .then(
          async (uploaded : boolean | undefined) => {
            if(uploaded === undefined){
              this.setStatus(400);
              console.log('Error in welcome/uploadData: Error in uploading data');
              return undefined;
            }
            return uploaded;
          }
        )
    }catch(error){
      this.setStatus(500);
      console.error('Error in welcome/uploadData: ', error);
      return undefined;
    }

  }
}