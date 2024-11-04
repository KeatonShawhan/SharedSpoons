import { Request, Response, NextFunction } from 'express';
import { AccountService } from './account/service';

// Authentication middleware that conforms to TSOA's expected signature
export const expressAuthentication = async (
  req: Request,
  securityName: string, 
  scopes?: string[],
  res?: Response
): Promise<void> => {
  const accessToken = req.headers['authorization']?.split(' ')[1];
  console.log(accessToken);

  const openRoutes = ['/auth/login', '/auth/signup'];
  if (openRoutes.includes(req.path)) {
    return;
  }
  
  if (!accessToken) {
    if (res) {
      res.status(401).send("Unauthorized");
    }
    return;
  }

  try {
    const account = await new AccountService().check(accessToken.toString());
    req.user = account;
  } catch (error) {
    if (res) {
      res.status(401).send("Unauthorized");
    }
  }
};
