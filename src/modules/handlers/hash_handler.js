import { calculateHash } from "./../operation/hash.js";

const hash_info = async (args) => {
    if (args.length === 0) {
        console.log("the 'hash' command must contains at least one argument.");
        return;
    }
    let filePath = args[0];

   await calculateHash(filePath);
};

export { hash_info }
