import { Controller, Get, Route, Request, FormField, Post, Body, UploadedFile} from 'tsoa';
import {Fruit, FruitInput} from '.';
import * as express from 'express';
import {ExampleService} from './exService'; 
//import { S3Service } from '../s3service'; // Your S3 service for handling uploads


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
}

// @Route('images')
// export class ImageController extends Controller {
//   private s3Service = new S3Service();

//   @Post('/upload')
//   public async uploadImage(
//     @Request() request: express.Request,
//     @UploadedFile() file: Express.Multer.File,
//     @FormField() caption: string // Use @FormField to accept caption
//   ): Promise<{ imageUrl: string; caption: string }> {
//     // Use S3Service to upload the image to S3 and return the URL
//     const imageUrl = await this.s3Service.uploadFile(file, caption);
//     return { imageUrl, caption };
//   }

//   @Get('/retrieve')
//   public async getImage(
//     @Request() request: express.Request,
//     @FormField() imageId: string // Update if you want to accept imageId as a form field
//   ): Promise<{ imageUrl: string; caption: string }> {
//     // Use S3Service to retrieve the image URL and caption from the database
//     const { imageUrl, caption } = await this.s3Service.getFile(imageId);
//     return { imageUrl, caption };
//   }
// }