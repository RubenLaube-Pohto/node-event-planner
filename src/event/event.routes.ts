import { validate } from 'class-validator';
import { Router } from 'express';
import {
    AddVotesRequest,
    CreateEventRequest,
    CreateEventResponse,
    Event,
    GetEventResponse,
    ListEventsResponse,
} from '../shared/models';
import * as EventHandler from './event.handler';

const routes = Router();

/**
 * List Events
 */
routes.get('/list', async (req, res, next) => {
    try {
        const events = await EventHandler.list();
        const response: ListEventsResponse = {
            events: events.map(e => ({ id: e.id!, name: e.name })),
        };
        res.status(200).send(response);
    } catch (err) {}
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
routes.get('/:id', async (req, res, next) => {
    try {
        const id: string = req.params.id;
        const event = await EventHandler.get(id);
        const response: GetEventResponse = event;
        res.status(200).send(response);
    } catch (err) {}
});

/**
 * Create Event
 */
routes.post('/', async (req, res, next) => {
    try {
        const reqBody = new CreateEventRequest(req.body);
        const errors = await validate(reqBody);

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            const event: Event = {
                name: reqBody.name!,
                dates: reqBody.dates!,
                votes: [],
            };
            const id = await EventHandler.add(event);
            const response: CreateEventResponse = { id };

            res.status(200).send(response);
        }
    } catch (err) {}
});

export { routes };
