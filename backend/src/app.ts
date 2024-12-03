import express, { 
  Express, 
  Router, 
  Response as ExResponse, 
  Request as ExRequest, 
  ErrorRequestHandler 
} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "../build/routes";
// import { expressAuthentication } from './middleware';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v0/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

const router = Router();
// router.use(expressAuthentication);
RegisterRoutes(router);
app.use('/api/v0', router);

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res && typeof res.status === 'function') {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      errors: err.errors,
      status: err.status || 500,
    });
  } else {
    console.error('Invalid response object in error handler:', err);
    next(err); // Ensure the error is passed along if `res` is invalid
  }
};
app.use(errorHandler);


export default app;
