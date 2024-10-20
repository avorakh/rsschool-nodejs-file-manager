import { compressFile, decompressFile } from '../zip_ops/zip_ops.mjs'

const compress = async (args) => {
    if (args.length !== 2) {
        console.log("the 'compress' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationPath] = args;

    await compressFile(sourcePath, destinationPath);
};


const decompress = async (args) => {
    if (args.length !== 2) {
        console.log("the 'decompress' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationPath] = args;
    await decompressFile(sourcePath, destinationPath);
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