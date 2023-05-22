import { Router } from "express";
import authRouter from "./auth.js";
import productsRouter from "./products.js";

const router = Router();

router.use(authRouter);
router.use(productsRouter);

export default router;
