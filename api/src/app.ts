import express, { json } from "express";
import morgan from "morgan";

import { defineHTTPBoundaryRoutes } from "./utils/api-boundary.js";
import { RouterMap } from "./routes.js";
import { ErrorMap } from "./errors.js";
import { container } from "./container.js";
import { dependencies } from "./dependencies.js";
import { subscribeEventAppliers } from "./events.js";
import { jwtAuth } from "./middlewares/jwt-auth.js";

(async () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(
        json({
            strict: true,
        })
    );

    app.use(jwtAuth);

    await container.registerAll(dependencies);

    subscribeEventAppliers();

    await container.dependencies.events.current!.rebuildState();

    defineHTTPBoundaryRoutes(app, RouterMap, ErrorMap);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
})();
