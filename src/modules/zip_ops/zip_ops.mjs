import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { BrotliCompress, BrotliDecompress } from 'node:zlib';
import { isExistingFile } from "../utils/file_utils.mjs";

export const compressFile = async (sourcePath, destinationPath) => {

    try {
        let resolvedSourcePath = resolve(sourcePath);
        let resolvedDestinationPath = resolve(destinationPath);

        let isExistingFilePath = await isExistingFile(resolvedSourcePath);
        if (!isExistingFilePath) {
            console.log(`ERROR - A file path is invalid or not found: '${resolvedSourcePath}'`);
            return;
        }

        let readableStream = createReadStream(resolvedSourcePath);

        let writableStream = createWriteStream(resolvedDestinationPath);

        let brotliStream = BrotliCompress();

        return new Promise((resolve) => {
            readableStream
                .pipe(brotliStream)
                .pipe(writableStream)
                .on('finish', () => {
                    console.log(`File compressed successfully to: ${resolvedDestinationPath}`);
                    resolve();
                })
                .on('error', (error) => {
                    console.error(`Error during compression: ${error.message}`);
                    resolve();
                });
        });

    } catch (error) {
        console.log(`ERROR - Failure during compress file ${error.message}`);
    }
};



export const decompressFile = async (sourcePath, destinationPath) => {
    try {
        let resolvedSourcePath = resolve(sourcePath);
        let resolvedDestinationPath = resolve(destinationPath);

        let isExistingFilePath = await isExistingFile(resolvedSourcePath);
        if (!isExistingFilePath) {
            console.log(`ERROR - A file path is invalid or not found: '${resolvedSourcePath}'`);
            return;
        }

        let readableStream = createReadStream(resolvedSourcePath);

        let writableStream = createWriteStream(resolvedDestinationPath);

        let brotliStream = BrotliDecompress();

        return new Promise((resolve) => {
            readableStream
                .pipe(brotliStream)
                .pipe(writableStream)
                .on('finish', () => {
                    console.log(`File decompressed successfully to: ${resolvedDestinationPath}`);
                    resolve();
                })
                .on('error', (error) => {
                    console.error(`Error during decompression: ${error.message}`);
                    resolve();
                });

        });
    } catch (error) {
        console.log(`ERROR - Failure during decompress file ${error.message}`);
    }
};