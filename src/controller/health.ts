import { Route, Get } from "tsoa";

@Route('/health')
export default class HealthController {
    @Get('/')
    public async index(): Promise<void> {
        return ;
    }
}
