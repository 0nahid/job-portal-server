import { Router } from "express";
import { hiringRouter } from "../../controllers/hiringController";
const router: Router = Router();

router.post("/", hiringRouter.hiringCreate);

export default router;
