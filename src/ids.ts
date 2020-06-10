/**
 * A list of all Minecraft block/item IDs.
 */
export interface CombinedIDs {
    [index: string]: {
        /**
         * Whether this ID is available as an item. For example, grass_block is available as an item and a block, but
         * air is only available as a block as you can't get air into your inventory.
         */
        item: boolean,

        /**
         * Whether this ID is available as a block. For example, stone is available as an item and a block, but sugar is only available
         * as an item -- there is no sugar block.
         */
        block: boolean,

        /**
         * The non-namespaced ID.
         */
        id: string,
    }
}