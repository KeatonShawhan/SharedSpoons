import { Controller, Get, Route, Request, Post, Body} from 'tsoa';
import {Fruit, FruitInput} from '.';
import * as express from 'express';
import {ExampleService} from './exService'; 



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