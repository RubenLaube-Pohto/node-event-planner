import {
    ArrayNotEmpty,
    ArrayUnique,
    IsISO8601,
    IsNotEmpty,
    IsString,
} from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - dates
 *         - votes
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         dates:
 *           type: array
 *           items:
 *             type: string
 *         votes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vote'
 */
export interface Event {
    /** Event id */
    id?: number | string;
    /** Event name */
    name: string;
    /** Suggested dates for the Event */
    dates: string[];
    /** Votes on dates */
    votes: Vote[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - date
 *         - people
 *       properties:
 *         date:
 *           type: string
 *         people:
 *           type: array
 *           items:
 *             type: string
 */
export interface Vote {
    /** Date voted on */
    date: string;
    /** People who have voted the date */
    people: string[];
}

// #region List events

/**
 * @swagger
 * components:
 *   responses:
 *     ListEventsResponse:
 *       description: List events response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               events:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 */
export interface ListEventsResponse {
    events: {
        /** Event id */
        id: number | string;
        /** Event name */
        name: string;
    }[];
}

// #endregion

// #region Create event

/**
 * @swagger
 * components:
 *   requestBodies:
 *     CreateEventRequest:
 *       description: Create event request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dates
 *             properties:
 *               name:
 *                 type: string
 *               dates:
 *                 type: array
 *                 items:
 *                   type: string
 */
export class CreateEventRequest {
    /** Event name */
    @IsString()
    @IsNotEmpty()
    name: string | undefined;

    /** Suggested dates for the event */
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsISO8601({
        each: true,
    })
    dates: string[] | undefined;

    constructor(body: any) {
        Object.assign(this, body);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     CreateEventResponse:
 *       description: Create event response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 */
export interface CreateEventResponse {
    /** Created Event id */
    id: number | string;
}

// #endregion

// #region Get event

/**
 * @swagger
 * components:
 *   responses:
 *     GetEventResponse:
 *       description: Get an event
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 */
export interface GetEventResponse extends Event {}

// #endregion

// #region Add vote

/**
 * @swagger
 * components:
 *   requestBodies:
 *     AddVotesRequest:
 *       description: Add a vote to an event
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - votes
 *             properties:
 *               name:
 *                 type: string
 *               votes:
 *                 type: array
 *                 items:
 *                   type: string
 */
export class AddVotesRequest {
    /** Voter name */
    @IsString()
    @IsNotEmpty()
    name: string | undefined;

    /** An array of dates that get a vote */
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsISO8601({
        each: true,
    })
    votes: string[] | undefined;

    constructor(body: any) {
        Object.assign(this, body);
    }
}

/**
 * @swagger
 * components:
 *   responses:
 *     AddVotesResponse:
 *       description: Add a vote to an event
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 */
export interface AddVotesResponse extends Event {}

// #endregion

// #region Event results

/**
 * @swagger
 * components:
 *   responses:
 *     EventResultsResponse:
 *       description: Get event results
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               suitableDates:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Vote'
 */
export interface EventResultsResponse {
    /** Event id */
    id: number | string;
    /** Event name */
    name: string;
    /**
     * Selection of suitable dates
     *
     * These are based on the dates of the Event where every person who has voted
     * has agreed on a date.
     */
    suitableDates: Vote[];
}

// #endregion
