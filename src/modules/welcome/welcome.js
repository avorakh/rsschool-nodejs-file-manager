
const defaultUserName = 'User';

const argNamePrefix = /^--/;
const empty_str = '';
const prefix = '';


const parseUsername = () => {
    let args = process.argv.slice(2);

    let username = defaultUserName;

    for (let i = 0; i < args.length; i ++) {
        let arg = args[i];
        
        if (arg.startsWith('--username=')) {
            username = arg.split('=')[1]
            break
        }     
    }

    return username;
};

const welcome = () => {

    let username = parseUsername()

    console.log(`Welcome to the File Manager, ${username}!`);
}

export { welcome };