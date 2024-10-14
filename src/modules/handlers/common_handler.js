import { exitApp } from "./../operation/exit.js";
import { parseCommand } from "./../utils/command_utils.js";
import { system_info } from "./os_handler.js";
import { handleHashCommand } from "./hash_handler.mjs";
import { handleNwdCommand } from "./nwd_handler.js";
import { handleFileCommand } from "./file_ops_handler.js";
import { handleZipCommand } from "./zip_ops_handler.mjs"


const handleCommand = async (command, username) => {

  let parsedCommand = parseCommand(command);
  switch (parsedCommand.command) {
    case '.exit':
      exitApp(username);
      break;

    case 'os':
      system_info(parsedCommand.args);
      break;

    case 'hash':
      await handleHashCommand(parsedCommand.args);
      break;

    case 'ls':
    case 'up':
    case 'cd':
      await handleNwdCommand(parsedCommand)
      break;

    case "add":
    case 'cat':
    case 'rn':
    case 'rm':
    case 'cp':
    case 'mv':
      await handleFileCommand(parsedCommand)
      break;

    case 'compress':
    case 'decompress':
      await handleZipCommand(parsedCommand);
      break;
    default:
      console.log('Invalid input');
      break;
  }
};

export { handleCommand }