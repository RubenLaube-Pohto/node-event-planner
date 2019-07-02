import { validate } from 'class-validator';
import { database } from '../shared/database';
import { HttpError } from '../shared/error/error';
import { Event } from '../shared/models';

const COLLECTION = 'events';

export function list(): Promise<Event[]> {
    return database().list(COLLECTION);
}

export function add(event: Event) {
    return database().add(COLLECTION, event);
}

export function get(id: string): Promise<Event> {
    return database()
        .get(COLLECTION, id)
        .then(event => {
            if (!event) {
                throw new HttpError(404, `Event id ${id} not found.`);
            }

            return event;
        });
}

export function update(id: string, data: Partial<Event>): Promise<Event> {
    return database().update(COLLECTION, id, data);
}

/**
 * Validates given request
 *
 * @param request An instance of a class implementing class-validator decorators
 * @returns Return input as Promise or throw on errors
 */
export function validateRequest<T>(request: T): Promise<T> {
    return validate(request).then(errors => {
        if (errors.length > 0) {
            throw new HttpError(400, errors);
        }

        return request;
    });
}
