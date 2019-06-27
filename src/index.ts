import * as cors from 'cors';
import * as express from 'express';
import * as event from './event';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/api/v1/event', event.routes);

export { app as eventPlanner };
