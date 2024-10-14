const argNamePrefix = /^--/;
const empty_str = '';

function Command(command, args) {
    this.command = command;
    this.args = args;
};

const parseCommand = (inputString) => {

    const parts = inputString.trim().split(/\s+/);

    const commandName = parts[0] || "";
    const args = parts.slice(1);

    return new Command(commandName, args);
};

const replaceArgPrefix = (arg) => {
    return arg.replace(argNamePrefix, empty_str);
}

export { parseCommand, replaceArgPrefix };