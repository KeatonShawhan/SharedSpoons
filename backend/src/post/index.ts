import { UUID } from '../types';

export interface PostJSON{
  image: string;
  rating: number;
  restaurant: string;
  dish: string;
  time: string;
  caption: string;
  pfp: string;
  username: string;
  is_saved: string;
  is_liked: string;
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