#! /usr/bin/env node

import { writeTSFile, writeTextFile } from "./output";

const usage = `Proper usage:
npx scrape-mc-ids <outfile path> <type: ts (typescript) or txt> [blocks|items|all|combined (default: all)]

Example:
npx scrape-mc-ids "./mc-ids.ts" ts
`

const [,, path, type, target] = process.argv;

//console.log({path, type, target});

console.log('\n\n\n');

if (!~['ts', 'txt'].indexOf(type)) {
    console.error(`Error on second argument, expected 'ts' or 'txt', got '${type}'. ${usage}`);
    process.exit();
} else if (target && !~['blocks', 'items', 'all', 'combined'].indexOf(target)) {
    console.error(`Error on third argument, expected 'blocks', 'items', 'all', 'combined' or nothing, got '${target}'. ${usage}`);
    process.exit();
} else if (type === 'ts' && target) {
    console.error(`The last argument, '${target}', is only allowed with 'txt'.`);
    process.exit();
}

function success() {
    console.log(`Successfully wrote Minecraft IDs to ${path}`)
}

function error(reason: string) {
    console.error(`An error has occurred. ${reason}`);
}

if (type === 'ts') {
    writeTSFile(path).then(success).catch(error);
} else {
    writeTextFile(path, target as any || 'all').then(success).catch(error);
}