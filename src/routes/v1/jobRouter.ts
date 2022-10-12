import { Router } from "express";
import { jobRouter } from "../../controllers/jobController";
import { authorization } from "../../middlewares/authorization";
import { verifyToken } from "../../middlewares/verifyToken";
const router: Router = Router();

router.post(
  "/",
  verifyToken,
  authorization(["hr", "admin"]),
  jobRouter.createJob
);
router.get("/", jobRouter.getJobs);
router.get("/:id", jobRouter.getSingleJob);

export default router;
