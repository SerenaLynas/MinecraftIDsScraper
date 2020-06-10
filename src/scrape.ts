import axios from "axios";
import cheerio from "cheerio";

export interface URLsToScrape {
    blocksAndItems: string,
    onlyItems: string
}

/**
 * A list of all Minecraft block/item IDs.
 */
export interface IDs {
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

const defaultURLs = {
    /**
     * The URL to a list that contains both blocks and items on the Minecraft Wiki.
     */
    blocksAndItems: 'https://minecraft.gamepedia.com/Java_Edition_data_value/Blocks',

    /**
     * The URL to a list that contains only items on the Minecraft Wiki.
     */
    onlyItems: 'https://minecraft.gamepedia.com/Java_Edition_data_value/Items'
}

/**
 * Grabs the items from the URLs provided.
 * @param urls The links to the Gamepedia articles. Only change these URLs if the wiki changes the page location, or to go back in time to a previous version. (default: the correct URLs.)
 */
export async function scrape(urls: URLsToScrape = defaultURLs) {
    const rawIDs = await Promise.all([
        scrapeURL(urls.blocksAndItems),
        scrapeURL(urls.onlyItems)
    ]);

    const doneIDs: IDs = {};
    function ensure(string: string) {
        if (!doneIDs[string]) {
            doneIDs[string] = {
                item: false,
                block: false,
                id: string
            }
        }
    }

    const [ blocksAndItems, onlyItems ] = rawIDs;

    for (const id of blocksAndItems.normal) {
        doneIDs[id] = {
            item: true,
            block: true,
            id
        }
    }

    for (const id of blocksAndItems.gray) {
        ensure(id)

        doneIDs[id].block = true
    }

    for (const id of onlyItems.normal) {
        ensure(id)

        doneIDs[id].item = true;
    }

    return doneIDs;
}

async function scrapeURL(url: string) {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const normalResult: string[] = [];
    const grayedResult: string[] = [];
    
    $('tbody > tr').each((i, el) => {
        const text = $(el.lastChild).text().replace(/\n/, '');

        if ($(el.lastChild).attr('style')) {
            grayedResult.push(text);
        } else {
            normalResult.push(text)
        }
    });

    return {gray: grayedResult, normal: normalResult.slice(1)};
}