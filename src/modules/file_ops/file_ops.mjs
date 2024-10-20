import { createReadStream, createWriteStream } from 'node:fs';
import { open, rename, unlink } from 'node:fs/promises';
import { resolve, dirname, join, basename } from 'node:path';
import { isExistingPath } from "../utils/file_utils.mjs";


export const addEmptyFile = async (fileName) => {
    try {
        let filePath = resolve(process.cwd(), fileName);

        let fileHandle = await open(filePath, 'w');
        await fileHandle.close();
    } catch (error) {
        console.error(`ERROR - Failure during creating file: ${error.message}`);
    }
};

export const copyFile = (sourcePath, destinationDir) => {
    try {
        let resolvedSourcePath = resolve(sourcePath);
        let fileName = basename(resolvedSourcePath);
        let resolvedDestinationPath = join(resolve(destinationDir), fileName);

        let readableStream = createReadStream(resolvedSourcePath);
        let writableStream = createWriteStream(resolvedDestinationPath);

        return new Promise((resolve) => {
            readableStream.pipe(writableStream);

            readableStream.on('error', (error) => {
                console.error(`Error reading from source file: ${error.message}`);
                resolve();
            });

            writableStream.on('error', (error) => {
                console.error(`Error writing to destination file: ${error.message}`);
                resolve();
            });

            writableStream.on('finish', () => {
                console.log(`File copied successfully to: ${resolvedDestinationPath}`);
                resolve();
            });
        });

    } catch (error) {
        console.error(`ERROR - Failure during copying file: ${error.message}`);
    }
};


export const readFile = async (filePath) => {
    let isExistingFile = await isExistingPath(filePath);
    if (!isExistingFile) {
        console.log(`ERROR - A path not found: '${filePath}'`);
        return;
    }
    try {
        let inputFileStream = createReadStream(resolve(filePath), { encoding: 'utf-8' });
        return new Promise((resolve) => {


            inputFileStream.on('error', (error) => {
                console.log(`ERROR - Failure during file reading: ${error.message}`);
                resolve();
            });

            inputFileStream.on('readable', () => {
                let chunk;

                while ((chunk = inputFileStream.read()) !== null) {
                    process.stdout.write(chunk.toString());
                }
            });
            inputFileStream.on("end", () => {
                console.log("\n");
                resolve();
            });
        });
    } catch (error) {
        console.error(`ERROR - Failure during reading file: ${error.message}`);
    }
};


export const removeFile = async (filePath) => {
    try {
        let resolvedPath = resolve(filePath);
        await unlink(resolvedPath);
    } catch (error) {
        console.error(`ERROR - Failure during deleting file: ${error.message}`);
    }
};

export const renameFile = async (filePath, newFileName) => {

    let currentDir = dirname(resolve(filePath));
    let newFilePath = join(currentDir, newFileName);

    try {
        await rename(filePath, newFilePath);
    } catch (error) {
        console.error(`ERROR - Failure during renaming file: ${error.message}`);
    }
};

export const moveFile = (sourcePath, destinationDir) => {

    let resolvedSourcePath = resolve(sourcePath);
    let fileName = basename(resolvedSourcePath);
    let resolvedDestinationPath = join(resolve(destinationDir), fileName);

    try {

        let readableStream = createReadStream(resolvedSourcePath);
        let writableStream = createWriteStream(resolvedDestinationPath);


        return new Promise((resolve) => {
            readableStream.pipe(writableStream);


            writableStream.on('finish', async () => {
                console.log(`File copied successfully to: ${resolvedDestinationPath}`);
                try {
                    await unlink(resolvedSourcePath);
                    console.log(`File moved successfully. Deleted original file: ${resolvedSourcePath}`);
                } catch (error) {
                    console.error(`Error deleting original file: ${error.message}`);
                }
                resolve();
            });

            readableStream.on('error', (error) => {
                console.error(`Error reading from source file: ${error.message}`);
                resolve();
            });


            writableStream.on('error', (error) => {
                console.error(`Error writing to destination file: ${error.message}`);
                resolve();
            });
        });

    } catch (error) {
        console.error(`Error during the move operation: ${error.message}`);
    }
};
