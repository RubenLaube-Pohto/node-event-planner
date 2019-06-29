export interface DatabaseConnection {
    /**
     * List all items in collection
     *
     * @param collection Target collection
     * @returns Promise that resolves to an array of items
     */
    list(collection: string): Promise<any[]>;

    /**
     * Get item by id
     *
     * @param collection Target collection
     * @param id Item id
     * @returns Promise that resolves to a retrieved item or null
     */
    get(collection: string, id: number | string): Promise<any | null>;

    /**
     * Add new item to collection
     *
     * @param collection Target collection
     * @param obj Object to add
     * @returns Promise that resolves to the id of the added item
     */
    add(collection: string, obj: any): Promise<number | string>;

    /**
     * Update an existing item
     *
     * @param collection Target collection
     * @param id Item id
     * @param obj Object containing update data. Can be partial. Is applied to the existing object
     * @returns Promise that resolves to the full updated item
     */
    update(collection: string, id: string, obj: any): Promise<any>;

    /**
     * Remove item
     *
     * @param collection Target collection
     * @param id Item id
     * @returns Promise that resolves to true
     */
    remove(collection: string, id: number | string): Promise<true>;
}
