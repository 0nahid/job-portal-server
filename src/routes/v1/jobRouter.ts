import { Router } from "express";
import { jobRouter } from "../../controllers/jobController";
const router: Router = Router();

router.post("/", jobRouter.createJob);
router.get("/", jobRouter.getJobs);

export default router;
