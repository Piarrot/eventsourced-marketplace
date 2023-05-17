import express, { json } from "express";
import morgan from "morgan";

import { defineHTTPBoundaryRoutes } from "./utils/api-boundary.js";
import { RouterMap } from "./routes.js";
import { ErrorMap } from "./errors.js";

(async () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(
        json({
            strict: true,
        })
    );

    defineHTTPBoundaryRoutes(app, RouterMap, ErrorMap);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
})();
