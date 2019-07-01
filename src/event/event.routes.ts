import { validate } from 'class-validator';
import { Router } from 'express';
import {
    AddVotesRequest,
    AddVotesResponse,
    CreateEventRequest,
    CreateEventResponse,
    Event,
    EventResultsResponse,
    GetEventResponse,
    ListEventsResponse,
} from '../shared/models';
import * as EventHandler from './event.handler';

const routes = Router();

/**
 * List Events
 *
 * @swagger
 * /event/list:
 *   get:
 *     tags: [event]
 *     description: List events
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/ListEventsResponse'
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
 *
 * @swagger
 * /event/{id}/vote:
 *   post:
 *     tags: [event]
 *     description: Add a vote to an event
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       $ref: '#/components/requestBodies/AddVotesRequest'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/AddVotesResponse'
 */
routes.post('/:id/vote', async (req, res, next) => {
    try {
        const reqBody = new AddVotesRequest(req.body);
        const errors = await validate(reqBody);

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            const id: string = req.params.id;

            const event = await EventHandler.get(id);

            // TODO: optimize
            reqBody.votes!.forEach(date => {
                // 1. check if vote date is a valid date on the event
                if (event.dates.includes(date)) {
                    // 2. find or create Vote that matches date
                    let vote = event.votes.find(v => v.date === date);
                    if (!vote) {
                        vote = {
                            date,
                            people: [],
                        };
                        event.votes.push(vote);
                    }
                    // 3. add voter name if it is not yet included
                    if (!vote.people.includes(reqBody.name!)) {
                        vote.people.push(reqBody.name!);
                    }
                }
            });

            const response: AddVotesResponse = await EventHandler.update(id, {
                votes: event.votes,
            });

            res.status(200).send(response);
        }
    } catch (err) {}
});

/**
 * Show the results of an Event
 *
 * @swagger
 * /event/{id}/results:
 *   get:
 *     tags: [event]
 *     description: Get the results of an event
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/EventResultsResponse'
 */
routes.get('/:id/results', async (req, res, next) => {
    try {
        const event = await EventHandler.get(req.params.id);

        // TODO: optimize
        // 1. get a set of all the people who voted
        const people = new Set<string>();
        event.votes.forEach(vote => {
            vote.people.forEach(person => {
                people.add(person);
            });
        });
        // 2. find Votes where where all people are present
        const suitableDates = event.votes.filter(
            vote => vote.people.length === people.size
        );

        const response: EventResultsResponse = {
            id: event.id!,
            name: event.name,
            suitableDates,
        };
        res.status(200).send(response);
    } catch (err) {}
});

/**
 * Get Event by id
 *
 * @swagger
 * /event/{id}:
 *   get:
 *     tags: [event]
 *     description: Get an event
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/GetEventResponse'
 */
routes.get('/:id', async (req, res, next) => {
    try {
        const id: string = req.params.id;
        const event = await EventHandler.get(id);

        if (!event) {
            res.sendStatus(404);
        } else {
            const response: GetEventResponse = event;
            res.status(200).send(response);
        }
    } catch (err) {}
});

/**
 * Create Event
 *
 * @swagger
 * /event:
 *   post:
 *     tags: [event]
 *     description: Create a new event
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateEventRequest'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/CreateEventResponse'
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
