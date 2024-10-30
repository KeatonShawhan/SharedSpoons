export interface Authenticated {
    id: string,
    name: string,
    accessToken: string
  }
  
  export interface Credentials {
    username: string;
    password: string;
  }
  
  export type SessionUser = {
    id: string;
  };
  
  export type UserSignUp = {
    username: string;
    name: string;
    password: string;
    email: string;
  };
  
  export type SignUpRet = {
    username: string;
    name: string;
  };
  
  export type UserIdInfo = {
    id: string;
    name: string;
  }