import { replaceArgPrefix } from "./../utils/command_utils.js";
import {eol, cpu_info, homedir_info, username_info, arch_info} from "../os/os.mjs";


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