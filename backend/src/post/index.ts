import { UUID } from '../types';

export interface PostContent{
    image: string;
    rating: number;
    adds: number;
    restaurant: string;
    dish: string;
    time: string;
    caption: string;
  }
  

export interface PostInput {
    user: UUID;
    data: PostContent;
}