import { Router } from 'express';

const routes = Router();

/**
 * List Events
 */
routes.get('/list', (req, res, next) => {
    res.status(200).send({ msg: 'list events' });
});

/**
 * Add Vote to Event
 */
routes.post('/:id/vote', (req, res, next) => {
    res.status(200).send({ msg: 'add vote' });
});

/**
 * Show the results of an Event
 */
routes.get('/:id/results', (req, res, next) => {
    res.status(200).send({ msg: 'show result' });
});

/**
 * Get Event by id
 */
routes.get('/:id', (req, res, next) => {
    res.status(200).send({ msg: 'get event by id' });
});

/**
 * Create Event
 */
routes.post('/', (req, res, next) => {
    res.status(200).send({ msg: 'create event' });
});

export { routes };
