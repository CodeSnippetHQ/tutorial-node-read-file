const fs = require('node:fs/promises');

async function main() {
    // get the current working directory
    const currentDir = process.cwd();

    // navigate up one level to where the .env file is located
    const envFile = await fs.readFile(`${currentDir}/../.env`, 'utf-8');

    // ...

    // parse the .env file into a javascript object
    const env = convertEnvFileToObject(envFile);

    // connect to our dummy database
    // passing in the environment variables as parameters
    connectToDatabase({
        host: env.DB_HOST,
        port: env.DB_PORT,
        name: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
    });
}

function connectToDatabase({ host, port, name, user, password }) {
    // check that all the required parameters are present
    if (!host || !port || !name || !user || !password) {
        throw new Error('Invalid database configuration');
    }
    console.log(`Successfully connected to database: ${user}:${password}@${host}:${port}/${name}`);
}

function convertEnvFileToObject(file) {
    // split the file into lines
    const lines = file.split('\n');
    // create an empty object to store the parsed values
    const parsed = {};

    // iterate over each line of the file
    for (const line of lines) {
        // skip comments
        if (line.startsWith('#')) {
            continue;
        }

        // split the line into key and value
        const [key, value] = line.split('=');
        // store the key and value in the object
        parsed[key] = value;
    }
    // return the parsed object
    return parsed;
}

main().catch((err) => console.error(err));
