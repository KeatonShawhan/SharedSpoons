import { Controller, Get, Route, Request, FormField, Post, Body, UploadedFile, Query} from 'tsoa';
import * as express from 'express';
import { S3Service } from './s3service'; // Your S3 service for handling uploads

/*
@Route('example')
export class ExampleController extends Controller {
  @Get()
  public async getAll(@Request() request: express.Request
  ): Promise<Fruit[]|undefined> {
    return new ExampleService().getAll(request.user!);
  }

  @Post()
  public async newFruit(
    @Request() request: express.Request, 
    @Body() fruit: FruitInput
  ): Promise<Fruit|undefined> {
    return new ExampleService().newFruit(fruit);
  }
}*/


// Example routes that utilize the s3 service. Eventually needs to be
// removed and replaced with the actual routes that will be used.
@Route('images')
export class ImageController extends Controller {
  private s3Service = new S3Service();

  @Post('/upload')
  public async uploadImage(
    @Request() request: express.Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ s3key: string }> {
    // Use S3Service to upload the image to S3 and return the s3 key
    const s3key = await this.s3Service.uploadFile(file);
    if (s3key === undefined) {
      this.setStatus(500);
      throw new Error('Could not upload file');
    }
    
    return { s3key };
  }

  @Get('/retrieve')
  public async retrieveImage(
    @Request() request: express.Request,
    @Query() s3key: string,
  ): Promise<string> {
    // Use S3Service to get a signed URL for the image
    const signedUrl = await this.s3Service.getFileLink(s3key);
    if (signedUrl === undefined) {
      this.setStatus(500);
      throw new Error('Could not get signed URL');
    }

    return signedUrl;
  }

}

