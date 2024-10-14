import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { BrotliCompress, BrotliDecompress } from 'node:zlib';


const compress = async (args) => {
    if (args.length !== 2) {
        console.log("the 'compress' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationPath] = args;
    let resolvedSourcePath = resolve(sourcePath);
    let resolvedDestinationPath = resolve(destinationPath);


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
};

const decompress = async (args) => {
    if (args.length !== 2) {
        console.log("the 'decompress' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationPath] = args;
    let resolvedSourcePath = resolve(sourcePath);
    let resolvedDestinationPath = resolve(destinationPath);

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
};

const handleZipCommand = async (cmd) => {
    switch (cmd.command) {

        case 'compress':
            await compress(cmd.args);
            break;
        case 'decompress':
            await decompress(cmd.args);
            break;
        default:
            console.log('Invalid input');
    }
}

export { handleZipCommand }