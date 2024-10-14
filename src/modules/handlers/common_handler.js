import { exitApp } from "./../operation/exit.js";

const handleCommand = (command, username, currentDirPath) => {

  switch (command) {
    case '.exit':
      exitApp(username);
      break;
    default:
      console.log('Invalid input');
  }

  return currentDirPath;
};

export { handleCommand }