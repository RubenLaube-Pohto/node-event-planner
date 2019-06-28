import {
    ArrayNotEmpty,
    ArrayUnique,
    IsISO8601,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class Event {
    /** Event id */
    id: number | undefined;
    /** Event name */
    name: string;
    /** Suggested dates for the Event */
    dates: string[];
    /** Votes on dates */
    votes: Vote[] = [];

    constructor(name: string, dates: string[]) {
        this.name = name;
        this.dates = Array.from(new Set(dates));
    }
}

export class Vote {
    /** Date voted on */
    date: string;
    /** People who have voted the date */
    people: string[];

    constructor(date: string, people: string[] = []) {
        this.date = date;
        this.people = people;
    }
}

// #region List events

export interface ListEventsResponse {
    events: {
        /** Event id */
        id: number;
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
    id: number;
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
    id: number;
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
