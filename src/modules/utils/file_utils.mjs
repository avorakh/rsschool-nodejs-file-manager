import { access, stat } from 'node:fs/promises';

const isExistingPath = async (filePath) => {
    try {
        await access(filePath);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};

const isFile = async (path) => {
    try {
        const stats = await stat(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
};


const isExistingFile = async (path) => {
    return await isExistingPath(path) && isFile(path);
};


export { isExistingPath , isExistingFile};