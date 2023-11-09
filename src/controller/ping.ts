import { Route, Get, Post, Response, SuccessResponse, Body, Query } from "tsoa";
import axios, { AxiosError } from "axios";

import { ReturnSummaryError, ValidateErrorJSON } from "../models/errors";
import loadEnv from "../utils/load_env";

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
            message: "API Pinged",
        };
    }

    /**
     * Route for ping the API. Usefull for testing multiple services
     * @param {PingData} data Data to send to the API and modify it as proof of work
     * @returns the data with the proof of work
     */
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async postMessage(
        @Body() data: PingData
    ): Promise<PingData> {
        if (!data.payload) data.payload = [];
        data.payload.push("API pinged");
        return data;
    }

    /**
     * Route for ping the API and other services linked. Usefull for testing multiple services<br>
     * With this method, the API will also ping the Logger Service
     * @param {PingData} data  Data to send to the service and modify it as proof of work
     * @returns the data with the proof of work
     */
    @Response<ValidateErrorJSON>(503, "Service Unavailable")
    @SuccessResponse("200", "OK")
    @Post("rec")
    public async postMessageRec(
        @Body() data: PingData
    ): Promise<PingData> {
        // let data = req.body;
        if (!data.payload) data.payload = [];
        data.payload.push("API pinged");

        const url = `http://localhost:${loadEnv.LOGGER_SERVICE_PORT}/logger/ping`;

        try {
            const response = await axios.post(url, data);
            const responseData: PingData = response.data;
            data.payload = responseData.payload;
            return data;

        } catch (error: any) {
            const err = `Logger service unreachable: ${error.code}`;
            data.payload?.push(err);
            throw new ReturnSummaryError(503, "Service Unavailable", data);
        }

    }
}