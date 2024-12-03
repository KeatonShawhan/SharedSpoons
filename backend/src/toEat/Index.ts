import { UUID } from '../types/Index';

export interface PostJSON{
    image: string;
    rating: number;
    restaurant: string;
    dish: string;
    time: string;
    caption: string;
  }
  

export interface PostContent {
    user: UUID;
    data: PostJSON;
}

export interface PostTotal {
  id: UUID;
  user: UUID;
  data: PostJSON;
}