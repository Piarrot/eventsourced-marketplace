import { Router } from "express";
import { wrapBoundaryHandler } from "../utils/wrap-boundary-handler.js";
import { BOUNDARY_HANDLERS } from "marketplace-domain";
import { ErrorMap } from "../errors.js";

const router = Router();

router.get(
    "/products/own",
    wrapBoundaryHandler(BOUNDARY_HANDLERS["LIST_OWN_PRODUCTS_QUERY"], ErrorMap)
);

router.post(
    "/products",
    wrapBoundaryHandler(BOUNDARY_HANDLERS["PRODUCT_CREATE_COMMAND"], ErrorMap)
);

router.patch(
    "/products/:id",
    wrapBoundaryHandler(BOUNDARY_HANDLERS["PRODUCT_UPDATE_COMMAND"], ErrorMap)
);

export default router;
