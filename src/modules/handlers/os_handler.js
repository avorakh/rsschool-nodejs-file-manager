import { replaceArgPrefix } from "./../utils/command_utils.js";
import { EOL, cpus, homedir, userInfo } from 'node:os';


const eol = () => {
    console.log(`The default system End-Of-Line character is: ${JSON.stringify(EOL)}`);
};


const cpu_info = () => {

    let cpus_data = cpus();
    let totalCPUs = cpus_data.length;

    console.log(`Total number of CPUs: ${totalCPUs}`);

    cpus_data.forEach((cpu, index) => {
        let model = cpu.model;
        let speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: Model: ${model}, Speed: ${speedGHz} GHz`);
    });
};


const homedir_info = () => {
    console.log(`Your home directory is '${homedir}'`);
};


const username_info = () => {

    let username = userInfo().username;

    console.log(`Your system user name is '${username}'`);
};


const arch_info = () => {
    console.log(`CPU architecture: ${process.arch}`);
};


const system_info = (args) => {

    if (args.length === 0) {
        console.log("the 'os' command must contains at least one argument.");
        return;
    }
    let arg = replaceArgPrefix(args[0]);
    
    switch (arg) {
        case 'EOL':
            eol();
            break;
        case 'cpus':
            cpu_info();
            break;
        case 'homedir':
            homedir_info();
            break;
        case 'username':
            username_info();
            break;
        case 'architecture':
            arch_info();
            break;
        default:
            console.log("Unsupported args for OS");
    }
}

export { system_info }