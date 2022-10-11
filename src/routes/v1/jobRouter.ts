import { Router } from "express";
import { jobRouter } from "../../controllers/jobController";
const router: Router = Router();

router.post("/", jobRouter.createJob);

export default router;
