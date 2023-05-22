import { Router } from "express";

import { wrapBoundaryHandler } from "../utils/wrap-boundary-handler.js";
import { BOUNDARY_HANDLERS } from "marketplace-domain";
import { ErrorMap } from "../errors.js";

const router = Router();

router.post(
    "/auth/login",
    wrapBoundaryHandler(BOUNDARY_HANDLERS["USER_LOGIN_QUERY"], ErrorMap)
);
router.post(
    "/auth/register",
    wrapBoundaryHandler(BOUNDARY_HANDLERS["USER_REGISTER_COMMAND"], ErrorMap)
);

export default router;
