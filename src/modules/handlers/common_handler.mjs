import { exitApp } from "../operation/exit.mjs";
import { parseCommand } from "../utils/command_utils.mjs";
import { system_info } from "./os_handler.mjs";
import { handleHashCommand } from "./hash_handler.mjs";
import { handleNwdCommand } from "./nwd_handler.mjs";
import { handleFileCommand } from "./file_ops_handler.mjs";
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