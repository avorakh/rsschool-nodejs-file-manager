import { calculateHash } from "../hash/hash.mjs";

export const handleHashCommand = async (args) => {
    if (args.length === 0) {
        console.log("the 'hash' command must contains at least one argument.");
        return;
    }
    let filePath = args[0];

    await calculateHash(filePath);
};