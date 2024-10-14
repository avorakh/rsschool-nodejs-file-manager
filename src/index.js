import { welcome } from "./modules/operation/welcome.js";
import { exitApp } from "./modules/operation/exit.js";
import { printDirectoryPath } from "./modules/operation/pwd.js";
import { cli_reader } from "./modules/utils/readline.js";
import { handleCommand } from "./modules/handlers/common_handler.js";
import { homedir } from 'node:os';


const rl = cli_reader;
const username = welcome();

const init_output = (dirPath) => {
    printDirectoryPath(dirPath);
    rl.prompt();
};

let currentDirectory = homedir();

init_output(currentDirectory);

rl.on('line', async (input) => {
    const command = input.trim();

    currentDirectory =  await handleCommand(command, username, currentDirectory);
    init_output(currentDirectory);
}).on('close', async () => {
    exitApp(username);
});

