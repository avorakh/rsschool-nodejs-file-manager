import { welcome } from "./modules/operation/welcome.mjs";
import { exitApp } from "./modules/operation/exit.mjs";
import { printDirectoryPath } from "./modules/operation/pwd.mjs";
import { cli_reader } from "./modules/utils/readline.mjs";
import { handleCommand } from "./modules/handlers/common_handler.mjs";
import { homedir } from 'node:os';

const rl = cli_reader;
const username = welcome();

const init_output = () => {
    let currentDir = process.cwd();
    printDirectoryPath(currentDir);
    rl.prompt();
};

process.chdir(homedir());
init_output();

rl.on('line', async (input) => {
    const command = input.trim();

    await handleCommand(command, username);
    init_output();
}).on('close', async () => {
    exitApp(username);
});

