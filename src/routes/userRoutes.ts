import { Router, Request, Response } from 'express';

const router = Router();


router.get('/users', (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'John Doe' }]);
});

export default router;