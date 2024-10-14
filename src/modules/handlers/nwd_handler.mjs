import { ls, up, cd } from '../nwd/nwd.mjs';

const handleNwdCommand = async (cmd) => {
    switch (cmd.command) {
        case 'up':
            up();
            break;

        case 'cd':
            await cd(cmd.args);
            break;

        case 'ls':
            await ls();
            break;

        default:
            console.log('Invalid input');
    }
}

export { handleNwdCommand }