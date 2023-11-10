import { Route, Get } from "tsoa";

import env from "../utils/load_env";
import { app, PORT } from "..";

@Route('api/health')
export default class HealthController {

    private static instance: HealthController;
    private constructor() { }
    public static getInstance(): HealthController {
        if (!HealthController.instance) {
            HealthController.instance = new HealthController();
        }
        return HealthController.instance;
    }

    @Get('/')
    public async getHealth(): Promise<any> {
        let accessToLoggerService = false;
        try {
            const res = await fetch(`${env.LOGGER_SERVICE_URL}/logger/ping`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                accessToLoggerService = true;
            }
        } catch (err) {
            console.error(err);
        } finally {
            return {
                status: 'OK',
                message: 'Server is running',
                timestamp: new Date().toLocaleString(),
                NODE_ENV: process.env.NODE_ENV,
                PORT: PORT,
                env: app.settings.env,
                accessToLoggerService: accessToLoggerService
            };
        }
    }
}
