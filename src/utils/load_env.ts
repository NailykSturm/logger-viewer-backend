import * as dotenv from "dotenv";
dotenv.config();

interface ENV {
    LOGGER_SERVICE_PORT: number | undefined;
}
interface Config {
    LOGGER_SERVICE_PORT: number
}


const getConfig = (): ENV => {
    return {
        LOGGER_SERVICE_PORT: Number(process.env.LOGGER_SERVICE_PORT) || 3660,
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
export default sanitizedConfig;