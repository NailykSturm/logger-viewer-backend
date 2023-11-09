import { CorsOptions } from "cors"

export default {
    allowedHeaders: [
        "Origin",
        "Content-type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
} as CorsOptions;