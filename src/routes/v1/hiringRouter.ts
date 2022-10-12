import { Router } from "express";
import { hiringRouter } from "../../controllers/hiringCompanyController";
import { authorization } from "../../middlewares/authorization";
import { verifyToken } from "../../middlewares/verifyToken";
const router: Router = Router();

// router.post("/", hiringRouter.hiringCreate)
router
  .route("/")
  .post(verifyToken, authorization(["admin"]), hiringRouter.createHrCompany)
  .get(hiringRouter.getHrCompanies);

router.route("/:id").get(hiringRouter.getHrCompanyById);
export default router;
