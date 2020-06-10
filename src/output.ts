import { scrape } from "./scrape"
import { getBlockIDs, getItemIDs, getAll } from "./helpers";
import * as fs from 'fs-extra';

function getFn(string: 'blocks' | 'items' | 'all') {
    switch(string) {
        case 'blocks': return getBlockIDs;
        case 'items': return getItemIDs;
        case 'all': return getAll;
        default: throw 'err'
    }
}

export async function writeTSFile(path: string) {
    const ids = await scrape();

    function out (fn: any) {
        return JSON.stringify(fn(ids), null, 4).split(/\n/).map(str => '    ' + str).join('\n').trim();
    }

    const text = 
`export const minecraftIDs = {
    combined: ${out((i: any) => i)},
    all: ${out(getAll)},
    blocks: ${out(getBlockIDs)},
    items: ${out(getItemIDs)},
} as const;

export type ItemID = typeof minecraftIDs.items[number];
export type BlockID = typeof minecraftIDs.blocks[number];
export type MinecraftID = typeof minecraftIDs.all[number];
`;

    await fs.writeFile(path, text);
}

export async function writeTextFile(path: string, include: 'blocks' | 'items' | 'all' | 'combined') {
    const ids = await scrape();

    if (include === 'combined') {
        await fs.writeFile(path, JSON.stringify(ids, null, 4));
    } else {
        await fs.writeFile(path, getFn(include)(ids).join('\n'));
    }
}