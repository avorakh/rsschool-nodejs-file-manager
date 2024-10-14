import { exitApp } from "./../operation/exit.js";
import { parseCommand } from "./../utils/command_utils.js";
import { system_info } from "./os_handler.js";
import { hash_info } from "./hash_handler.js";
import { handleNwdCommand } from "./nwd_handler.js";

const handleCommand = async (command, username) => {

  let parsedCommand = parseCommand(command);
  // console.log(parsedCommand)
  switch (parsedCommand.command) {
    case '.exit':
      exitApp(username);
      break;

    case 'os':
      system_info(parsedCommand.args);
      break;

    case 'hash':
      await hash_info(parsedCommand.args);
      break;

    case 'ls':
    case 'up':
    case 'cd':
      await handleNwdCommand(parsedCommand)
      break;

    default:
      console.log('Invalid input');
  }
};

export { handleCommand }