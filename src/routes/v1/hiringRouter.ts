import { Router } from "express";
import { hiringRouter } from "../../controllers/hiringCompanyController";
const router: Router = Router();

// router.post("/", hiringRouter.hiringCreate)
router
  .route("/")
  .post(hiringRouter.createHrCompany)
  .get(hiringRouter.getHrCompanies);

export default router;
