import { Route, Get } from "tsoa";

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
    public async index(): Promise<void> {
        return ;
    }
}
