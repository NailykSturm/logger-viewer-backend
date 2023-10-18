import { Route, Get, Post, Response, SuccessResponse, Body } from "tsoa";

import { ValidateErrorJSON } from "../models/errors";

interface PingData {
    message: string;
    payload?: string[];
}

@Route("api/ping")
export default class PingController {

    private static instance: PingController;
    private constructor() { }
    public static getInstance(): PingController {
        if (!PingController.instance) {
            PingController.instance = new PingController();
        }
        return PingController.instance;
    }

    @Get('/')
    public async getMessage(): Promise<PingData> {
        return {
            message: "hello",
        };
    }

    /**
     * Route for ping the service and get a message
     * Usefull for testing multiple services
     * @param {PingData} data Data to send to the service and modify it as proof of work
     * @returns the data with the proof of work
     */
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async postMessage(
        @Body() data: PingData
    ): Promise<PingData> {
        if (!data.payload) data.payload = [];
        data.payload.push("Logger Service pinged");
        return data;
    }
}