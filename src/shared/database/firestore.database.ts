import { DatabaseConnection } from '../models';
import { Firestore } from '@google-cloud/firestore';

export class FirestoreDatabase implements DatabaseConnection {
    private firestore: Firestore;

    constructor(config: FirebaseFirestore.Settings) {
        this.firestore = new Firestore(config);
    }

    list(collection: string): Promise<any[]> {
        return this.firestore
            .collection(collection)
            .get()
            .then(snapshot =>
                snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    get(collection: string, id: string): Promise<any> {
        return this.firestore
            .collection(collection)
            .doc(id)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    return {
                        id: snapshot.id,
                        ...snapshot.data(),
                    };
                } else {
                    return undefined;
                }
            })
            .catch(err => {
                console.log(err);
                return undefined;
            });
    }

    add(
        collection: string,
        obj: FirebaseFirestore.DocumentData
    ): Promise<string | number> {
        return this.firestore
            .collection(collection)
            .add(obj)
            .then(ref => ref.id);
    }

    update(
        collection: string,
        id: string,
        obj: FirebaseFirestore.DocumentData
    ): Promise<any> {
        return this.firestore
            .collection(collection)
            .doc(id)
            .update(obj)
            .then(() => this.get(collection, id));
    }

    remove(collection: string, id: string | number): Promise<true> {
        throw new Error('Method not implemented.');
    }
}
