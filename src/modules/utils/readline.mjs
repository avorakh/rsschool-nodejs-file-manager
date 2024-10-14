import { createInterface } from 'node:readline';

const cli_reader = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

export { cli_reader }