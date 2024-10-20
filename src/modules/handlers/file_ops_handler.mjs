import { removeFile, renameFile, addEmptyFile, copyFile, readFile, moveFile } from '../file_ops/file_ops.mjs';


const add = async (args) => {
    if (args.length === 0) {
        console.log("the 'add' command must contains at least one argument.");
        return;
    }

    let filePathToCreate = args[0];

    await addEmptyFile(filePathToCreate);
};


const cp = async (args) => {
    if (args.length !== 2) {
        console.log("the 'cp' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationDir] = args;

    await copyFile(sourcePath, destinationDir)
};


const cat = async (args) => {
    if (args.length === 0) {
        console.log("the 'cat' command must contains at least one argument.");
        return;
    }
    let filePath = args[0];

    await readFile(filePath)
        ;
};


const mv = async (args) => {
    if (args.length !== 2) {
        console.log("the 'mv' command must contains at least 2 arguments.");
        return;
    }

    let [sourcePath, destinationDir] = args;
    await moveFile(sourcePath, destinationDir);
};


const rn = async (args) => {
    if (args.length !== 2) {
        console.log("the 'rn' command must contains at least 2 arguments.");
        return;
    }

    let [filePath, newFileName] = args;
    await renameFile(filePath, newFileName);
};


const rm = async (args) => {
    if (args.length === 0) {
        console.log("the 'rm' command must contains at least one argument.");
        return;
    }
    let filePathToRemove = args[0];

    await removeFile(filePathToRemove);
};


const handleFileCommand = async (cmd) => {
    switch (cmd.command) {
        case 'cat':
            await cat(cmd.args);
            break;

        case "add":
            await add(cmd.args);
            break;

        case "rm":
            await rm(cmd.args);
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