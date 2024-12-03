import {
  Query,
  Controller,
  Get,
  Route,
  Security,
  Request,
} from "tsoa";

import { ExploreService } from "./Service";
import { Suggestion } from "./Index";
import * as express from "express";
import { PostContent } from "../post/Index";
import { S3Service } from "../s3/Service"; // Import S3Service for signed URLs

@Security("jwt", ["member"])
@Route("explore")
export class ExploreController extends Controller {
  private s3Service = new S3Service();

  @Get("/search/suggestion")
  public async searchSuggestion(
    @Query() input: string,
    @Query() currentUsername: string
  ): Promise<Suggestion[] | undefined> {
    if (input.length < 1) {
      this.setStatus(400);
      return [];
    }

    return new ExploreService()
      .searchSuggestion(input, currentUsername)
      .then(async (searchResults: Suggestion[] | undefined ): Promise<Suggestion[] | undefined> => {
        if (!searchResults) {
          return [];
        }
        for (let i = 0; i < searchResults.length; i++) {
          const imageLink = await this.s3Service.getFileLink(searchResults[i].pfp);
          if (imageLink === undefined) {
            // console.error('Could not get image link for suggestion:', searchResults[i]);
            searchResults[i].pfp = '';
            return searchResults;
          }
          searchResults[i].pfp = imageLink;
        }
        return searchResults;
      });
  }

  @Get("/posts")
  public async explorePosts(
  @Request() request: express.Request,
  @Query("limit") limit = 36,
  @Query("offset") offset = 0
  ): Promise<PostContent[]> {
    try {
      if (!request.user) {
        this.setStatus(401);
        console.error("Unauthorized user");
        return [];
      }

      const posts = await new ExploreService().getExplorePosts(request.user.id, limit, offset);

      if (!posts || posts.length === 0) {
        this.setStatus(404);
        return [];
      }

      for (const post of posts) {
        const signedUrl = await this.s3Service.getFileLink(post.data.image);
        if (signedUrl) {
          post.data.image = signedUrl;
        } else {
          console.error(`Could not generate signed URL for image: ${post.data.image}`);
        }
      }

      this.setStatus(200);
      return posts;
    } catch (error) {
      this.setStatus(500);
      console.error("Error in explore /posts route:", error);
      return [];
    }
  }
}
