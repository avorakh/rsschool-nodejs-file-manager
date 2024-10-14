import { createHash } from 'node:crypto';
import { open } from 'node:fs/promises';
import { isExistingPath } from "./../utils/file_utils.js";


const calculateHash =  async (filePath) => {
    let isExistingFile = await isExistingPath(filePath);
    if (!isExistingFile) {
        console.log(`ERROR - A file not found: '${filePath}'`);
        return;
    }

    let fd = await open(filePath);
    let stream = fd.createReadStream();

    let hash = createHash('sha256');

     return new Promise((resolve, reject) => {
        stream.on('error', (error) => {
            console.log(`ERROR - Failure during Hash calculation: ${error.message}`);
            reject(error);
        });

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            let fileHash = hash.digest('hex');
            console.log(`Hash of file "${filePath}": ${fileHash}`);
            resolve(fileHash);
        });
    });
};

export { calculateHash }