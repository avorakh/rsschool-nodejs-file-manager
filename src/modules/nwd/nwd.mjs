import { dirname, resolve, isAbsolute } from 'node:path';
import { stat, readdir } from 'node:fs/promises';
import { isExistingPath } from "../utils/file_utils.mjs";


const up = () => {
    let currentDir = process.cwd();

    let parentDir = dirname(currentDir);

    if (currentDir !== parentDir) {
        process.chdir(parentDir);
    }
}

const cd = async (args) => {
    if (args.length === 0) {
        console.log("the 'cd' command must contains at least one argument.");
        return;
    }
    let targetPath = args[0].trim();
    let currentDir = process.cwd();

    let isAbsolutePath = isAbsolute(targetPath);
    let resolvedPath = isAbsolutePath ? targetPath : resolve(currentDir, targetPath);

    let isExistingDirPath = await isExistingPath(resolvedPath);
    if (!isExistingDirPath) {
        console.log(`ERROR: Directory '${targetPath}' does not exist.`);
        return;
    }

    try {
        let stats = await stat(resolvedPath);
        if (stats.isDirectory()) {
            process.chdir(resolvedPath);
            console.log(`Changed working directory to: ${process.cwd()}`);
        } else {
            console.log(`ERROR: '${resolvedPath}' is not a directory.`);
        }
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
    }
}

const ls = async () => {
    try {
        let currentDir = process.cwd();
        let items = await readdir(currentDir);

        let detailedItems = await Promise.all(
            items.map(async (item) => {
                let itemPath = resolve(currentDir, item);
                let itemStats = await stat(itemPath);
                return {
                    Name: item,
                    Type: itemStats.isDirectory() ? 'directory' : 'file',
                };
            })
        );

        detailedItems.sort((a, b) => {
            if (a.Type === b.Type) {
                return a.Name.localeCompare(b.Name);
            }
            return a.Type === 'directory' ? -1 : 1;
        });

        console.table(detailedItems);
    } catch (error) {
        console.error(`Error during 'ls' command: ${error.message}`);
    }
};

export { ls, up, cd }