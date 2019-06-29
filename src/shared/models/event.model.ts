import {
    ArrayNotEmpty,
    ArrayUnique,
    IsISO8601,
    IsNotEmpty,
    IsString,
} from 'class-validator';

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

export interface Vote {
    /** Date voted on */
    date: string;
    /** People who have voted the date */
    people: string[];
}

// #region List events

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

export interface CreateEventResponse {
    /** Created Event id */
    id: number | string;
}

// #endregion

// #region Get event

export interface GetEventResponse extends Event {}

// #endregion

// #region Add vote

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

export interface AddVotesResponse extends Event {}

// #endregion

// #region Event results

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
