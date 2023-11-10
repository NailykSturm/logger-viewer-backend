import * as dotenv from "dotenv";
import path from "path";


let envFile;
switch (process.env.NODE_ENV) {
    case "docker":
        envFile = ".env.docker";
        break;
    case "production":
        envFile = ".env.prod";
        break;
    default:
        envFile = ".env.dev";
        break;
}

console.log(__dirname);
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

interface ENV {
    LOGGER_SERVICE_URL: string | undefined;
    NODE_ENV: string | undefined;
    PORT: number | undefined;
}
interface Config {
    LOGGER_SERVICE_URL: string;
    NODE_ENV: string;
    PORT: number;
}


const getConfig = (): ENV => {
    return {
        LOGGER_SERVICE_URL: process.env.LOGGER_SERVICE_URL || 'http://127.0.0.1:3660',
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 3550,
    }
}

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

console.log("Config loaded", sanitizedConfig);
export default sanitizedConfig;