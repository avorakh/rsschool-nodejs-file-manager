import { access } from 'node:fs/promises';

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

export { isExistingPath };