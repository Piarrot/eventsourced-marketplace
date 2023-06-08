import express, { json } from "express";
import morgan from "morgan";

import { dependencyContainer } from "./container.js";
import { registerDependencies } from "./dependencies.js";
import { subscribeEventAppliers } from "./events.js";
import { jwtAuth } from "./middlewares/jwt-auth.js";

import Router from "./routes/index.js";

(async () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(
        json({
            strict: true,
        })
    );

    app.use(jwtAuth);

    registerDependencies();

    subscribeEventAppliers();

    await dependencyContainer.events.rebuildState();

    app.use(Router);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
})();
