import { UUID } from '../types';
  
export interface Account {
    id: UUID,
    firstname: string,
    lastname: string,
    username: string
}
