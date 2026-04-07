import { Router, type IRouter } from "express";
import healthRouter from "./health";
import toursRouter from "./tours";

import bookingsRouter from "./bookings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(toursRouter);
router.use(bookingsRouter);

export default router;
