## A list of all Minecraft Java IDs with built-in type support.

# Examples

## List of IDs
You can get an array of the non-namespaced IDs of the current version like so:
```
import { minecraftIDs } from 'mc-ids';

const allIds = minecraftIDs.all;

// Or just items:
const itemIds = minecraftIDs.items;

// Or just blocks:
const blockIds = minecraftIDs.blocks;
```

## Types
Additionally, you can import type information:
```
// Typescript
import { BlockID } from 'mc-ids';

const id: BlockID = 'acacia_button';
```
Different types are useful because it prevents you from putting something like a stick, which isn't a block, into something that requires a block form (such as setblock).

There are three types:
* **BlockID**: The ID of a block only. For example, there is no 'stick' block (even though there is a stick item), so 'stick' wouldn't fit this type.
* **ItemID**: The ID of an item only. For example, there is no 'air' item, so 'air' wouldn't work here.
* **MinecraftID**: The ID of either a block or an item.

Additionally, you can use a certain version of Minecraft:
```
// Typescript
import { v1_15 } from 'mc-ids';

const id: v1_15.BlockID = 'acacia_button';

const allIDs = v1_15.minecraftIDs.all;
```
Right now, only 1.15 is supported.

Note that you'll get suggestions in your IDE about the type of the block:

![image of code](https://i.ibb.co/ySybpx1/mc-ids.png)

# Scraping

There's also a CLI scraper included in this package. Simply run:

```
npx scrape-mc-ids "PATH_TO_OUT_FILE" ts
```
which will generate a Typescript file with the most recent types from the wiki. You can also generate a text file:

```
npx scrape-mc-ids "PATH_TO_OUT_FILE" txt
```

TXT files are just the non-namespaced IDs separated by new lines. You can specify what you want on TXT files at the end of the command:
```
npx scrape-mc-ids "PATH_TO_OUT_FILE" txt [all|blocks|items|combined]
```

* **all** -- includes both items and blocks. (default)
* **blocks** -- just block IDs.
* **items** -- just item IDs.
* **combined** -- a JSON file in the 'combined' format:
    ```
    {
        [id: string]: {
            id: string,

            // Whether the ID is an item.
            item: boolean,

            // Whether the ID is a block.
            block: boolean
        }
    }
    ```
You can also use `minecraftIDs.combined` to access the combined format.

# Source Code
[Source code is available on GitHub.](https://github.com/SploxFox/MinecraftIDsScraper/issues)