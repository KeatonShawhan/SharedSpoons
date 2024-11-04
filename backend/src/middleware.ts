import { Request, Response, NextFunction } from 'express';
import { AccountService } from './account/service';

// Authentication middleware that conforms to TSOA's expected signature
export const expressAuthentication = async (
  req: Request,
  securityName: string,  // This is what TSOA expects
  scopes?: string[],      // This is also expected
  res?: Response          // Optional response object
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
    req.user = account;  // Attach user to request object
  } catch (error) {
    if (res) {  // If response is provided, send 401 status
      res.status(401).send("Unauthorized");
    }
  }
};
