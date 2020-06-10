import { IDs } from "./scrape";

function getIDs(ids: IDs, key: 'block' | 'item') {
    const itemIds: string[] = [];
    
    for (const [k, v] of Object.entries(ids)) {
        if (v[key]) {
            itemIds.push(k);
        }
    }

    return itemIds;
}

/**
 * Gets the IDs of items as a string array. Namespace not included.
 * @param ids The IDs object that contains both block and item IDs.
 */
export function getItemIDs(ids: IDs) {
    return getIDs(ids, 'item');
}

/**
 * Gets the IDs of blocks as a string array. Namespace not included.
 * @param ids The IDs object that contains both block and item IDs.
 */
export function getBlockIDs(ids: IDs) {
    return getIDs(ids, 'block');
}

/**
 * Gets all of the IDs. Does not include namespace.
 * @param ids The IDs object.
 */
export function getAll(ids: IDs) {
    return Object.keys(ids);
}