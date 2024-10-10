import { Controller, Get, Route, Request} from 'tsoa';
import {Fruit} from '.';
import * as express from 'express';
import {ExampleService} from './exService'; 



@Route('example')
export class ExampleController extends Controller {
  @Get()
  public async getAll(@Request() request: express.Request
  ): Promise<Fruit[]|undefined> {
    return new ExampleService().getAll(request.user!);
  }
}