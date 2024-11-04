export interface Authenticated {
    id: string,
    firstname: string,
    lastname: string,
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
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    phoneNumber: string;
  };
  
  export type SignUpRet = {
    username: string;
    firstname: string;
  };
  
  export type UserIdInfo = {
    id: string;
    name: string;
  }