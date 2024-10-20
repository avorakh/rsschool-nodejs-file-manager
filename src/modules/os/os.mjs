import { EOL, cpus, homedir, userInfo } from 'node:os';


export const eol = () => {
    console.log(`The default system End-Of-Line character is: ${JSON.stringify(EOL)}`);
};

export const cpu_info = () => {

    let cpus_data = cpus();
    let totalCPUs = cpus_data.length;

    console.log(`Total number of CPUs: ${totalCPUs}`);

    cpus_data.forEach((cpu, index) => {
        let model = cpu.model;
        let speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: Model: ${model}, Speed: ${speedGHz} GHz`);
    });
};

export const homedir_info = () => {
    console.log(`Your home directory is '${homedir}'`);
};

export const username_info = () => {

    let username = userInfo().username;

    console.log(`Your system user name is '${username}'`);
};

export const arch_info = () => {
    console.log(`CPU architecture: ${process.arch}`);
};