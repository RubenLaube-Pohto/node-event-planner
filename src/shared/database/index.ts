import { DatabaseConnection } from '../models';
import { FirestoreDatabase } from './firestore.database';

/**
 * Get database ref
 */
export function database(): DatabaseConnection {
    let db: DatabaseConnection | undefined;

    if (!db) {
        const config: FirebaseFirestore.Settings = {};
        config.projectId = process.env.PROJECT_ID;
        config.keyFilename = process.env.KEY_FILE;
        db = new FirestoreDatabase(config);
    }

    return db;
}
