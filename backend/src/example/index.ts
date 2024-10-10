import {UUID} from '../types';

export interface Fruit {
    id: UUID;
    name: string;
    color: string;
  }

  export interface FruitInput {
    name: string;
    color: string;
  }


  