import { Router } from "express";
import { availableJobsRouter } from "../../controllers/availableJobsController";
import { authorization } from "../../middlewares/authorization";
import { verifyToken } from "../../middlewares/verifyToken";
const router: Router = Router();

router
  .route("/")
  .post(
    verifyToken,
    authorization(["hr", "admin"]),
    availableJobsRouter.createAvailableJob
  )
  .get(availableJobsRouter.getAllAvailableJobs);

router.route("/:id").get(availableJobsRouter.getAvailableJobById);

export default router;
