import express, { Application, Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import { ValidateError, Route } from "tsoa";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import router from "./routes";
import corsConfig from "./utils/cors";

const PORT = process.env.PORT || 3550;

const app: Application = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

app.use("/api",router);

app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
        message: "Not Found",
    });
});

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});