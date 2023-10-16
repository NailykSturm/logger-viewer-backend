import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import router from "./routes";

const PORT = process.env.PORT || 3550;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    "/docs",
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

app.use(router);