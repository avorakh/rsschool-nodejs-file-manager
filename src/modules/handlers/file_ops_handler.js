import { createReadStream, createWriteStream } from 'node:fs';
import { open, rename, unlink } from 'node:fs/promises';
import { resolve, dirname, join, basename } from 'node:path';
import { isExistingPath } from "./../utils/file_utils.js";


const add = async (fileName) => {
    try {
        let filePath = resolve(process.cwd(), fileName);

        let fileHandle = await open(filePath, 'w');
        await fileHandle.close();
    } catch (error) {
        console.error(`ERROR - Failure during creating file: ${error.message}`);
    }
};

const cp = async (args) => {
    if (args.length !== 2) {
        console.log("the 'cp' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationDir] = args;

    let resolvedSourcePath = resolve(sourcePath);
    let fileName = basename(resolvedSourcePath);
    let resolvedDestinationPath = join(resolve(destinationDir), fileName);

    // Create readable and writable streams
    let readableStream = createReadStream(resolvedSourcePath);
    let writableStream = createWriteStream(resolvedDestinationPath);



    return new Promise((resolve) => {
        // Pipe the readable stream into the writable stream
        readableStream.pipe(writableStream);

        // Handle events for success and errors
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
};

const cat = async (filePath) => {
    let isExistingFile = await isExistingPath(filePath);
    if (!isExistingFile) {
        console.log(`ERROR - A path not found: '${filePath}'`);
        return;
    }

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
};



const mv = async (args) => {
    if (args.length !== 2) {
        console.log("the 'mv' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationDir] = args;

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
                    // Delete the original file after copying
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



const rn = async (args) => {
    if (args.length !== 2) {
        console.log("the 'rn' command must contains at least 2 arguments.");
        return;
    }

    let [filePath, newFileName] = args;
    let currentDir = dirname(resolve(filePath));
    let newFilePath = join(currentDir, newFileName);

    try {
        await rename(filePath, newFilePath);

    } catch (error) {
        console.error(`ERROR - Failure during renaming file: ${error.message}`);
    }
};


const rm = async (filePath) => {
    try {
        let resolvedPath = resolve(filePath);
        await unlink(resolvedPath);
    } catch (error) {
        console.error(`ERROR - Failure during deleting file: ${error.message}`);
    }
};

const handleFileCommand = async (cmd) => {
    switch (cmd.command) {
        case 'cat':
            if (cmd.args.length === 0) {
                console.log("the 'cat' command must contains at least one argument.");
                return;
            }
            let filePath = cmd.args[0];

            await cat(filePath);
            break;

        case "add":
            if (cmd.args.length === 0) {
                console.log("the 'add' command must contains at least one argument.");
                return;
            }
            let filePathToCreate = cmd.args[0];
            await add(filePathToCreate);
            break;

        case "rm":
            if (cmd.args.length === 0) {
                console.log("the 'add' command must contains at least one argument.");
                return;
            }
            let filePathToRemove = cmd.args[0];
            await rm(filePathToRemove);
            break;

        case 'rn':
            await rn(cmd.args);
            break;

        case 'cp':
            await cp(cmd.args);
            break;
        case 'mv':
            await mv(cmd.args);
            break;
        default:
            console.log('Invalid input');
    }
}

export { handleFileCommand }