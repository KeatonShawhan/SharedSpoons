import { UUID } from '../types/Index';
  
export interface Account {
    id: UUID,
    firstname: string,
    lastname: string,
    username: string,
}

export interface PfpAccount {
    id: UUID,
    firstname: string,
    lastname: string,
    username: string,
    pfp: string
}