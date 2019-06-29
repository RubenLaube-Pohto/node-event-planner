import { database } from '../shared/database';
import { Event } from '../shared/models';

const COLLECTION = 'events';

export function list(): Promise<Event[]> {
    return database().list(COLLECTION);
}

export function add(event: Event) {
    return database().add(COLLECTION, event);
}

export function get(id: string): Promise<Event> {
    return database().get(COLLECTION, id);
}

export function update(id: string, data: Partial<Event>): Promise<Event> {
    return database().update(COLLECTION, id, data);
}
