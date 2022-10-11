import { Router } from "express";
import { hiringRouter } from "../../controllers/hiringController";
const router: Router = Router();

// router.post("/", hiringRouter.hiringCreate)
router
  .route("/")
  .post(hiringRouter.hiringCreate)
  .get(hiringRouter.hiringGetAll);

export default router;
