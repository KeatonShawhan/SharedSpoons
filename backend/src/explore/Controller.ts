import {
    Query,
    Controller,
    Get,
    Route,
    Security,
    // Put,
    // Path
  } from "tsoa";
    
  import { ExploreService } from "./service";
  
  import {Suggestion} from './index';

  @Security('jwt', ['member'])
  @Route("explore")
  export class ExploreController extends Controller {
    @Get("/search/suggestion")
    public async searchSuggestion(
        @Query() input: string,
        @Query() currentUsername: string,
    ): Promise<Suggestion[]> {
      if (input.length < 1) {
        this.setStatus(400);
        return [];
      }
      return new ExploreService()
        .searchSuggestion(input, currentUsername)
        .then(
          async (
            usernames: Suggestion[]
          ): Promise<Suggestion[]> => {
            console.log("usernames: " + usernames);
            if (!usernames) {
              return [];     
            }
            return usernames;
          }
    );
  }
  }
