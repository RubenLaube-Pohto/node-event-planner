import * as cors from 'cors';
import * as express from 'express';
import * as event from './event';
import { errorHandler } from './shared/error/error';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api/v1/event', event.routes);
app.use(errorHandler);

export { app as eventPlanner };
