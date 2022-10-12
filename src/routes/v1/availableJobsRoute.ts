import { Router } from "express";
import { availableJobsRouter } from "../../controllers/availableJobsController";
const router: Router = Router();

router
  .route("/")
  .post(availableJobsRouter.createAvailableJob)
  .get(availableJobsRouter.getAllAvailableJobs);

export default router;
