import {
    Query,
    Controller,
    Get,
    Route,
    Security,
    Request
    // Path
  } from "tsoa";
    
  import { ExploreService } from "./service";
  import {Suggestion} from './index';
  import * as express from 'express';
import { PostContent } from "../post";


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
            searchResults: Suggestion[]
          ): Promise<Suggestion[]> => {
            console.log("Suggestions: " + searchResults);
            if (!searchResults) {
              return [];     
            }
            return searchResults;
          }
    );
  }

  @Get("/posts")
    public async explorePosts(
      @Request() request: express.Request,
    ): Promise<PostContent[]> {
      return new ExploreService()
        .getExplorePosts(request.user!.id)
        .then(
          async (
            posts: PostContent[]
          ): Promise<PostContent[]> => {
            console.log("posts: " + posts);
            if (!posts) {
              return [];     
            }
            return posts;
          }
    );
  }
  }
