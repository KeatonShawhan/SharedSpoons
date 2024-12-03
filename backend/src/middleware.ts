import { Request } from 'express';
import { AuthService } from './auth/service';
import { SessionUser } from './types';


// Authentication middleware that conforms to TSOA's expected signature
export const expressAuthentication = async (
  req: Request,
): Promise<SessionUser> => {
  const accessToken = req.headers['authorization']?.split(' ')[1];
  const openRoutes = ['/auth/login', '/auth/signup'];
  if (openRoutes.includes(req.path)) {
    return {} as SessionUser; 
  }
  
  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const account = await new AuthService().check(accessToken.toString());
    if (!account) {
      throw new Error("Unauthorized");
    }
    req.user = account;
    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Unauthorized");
  }
};