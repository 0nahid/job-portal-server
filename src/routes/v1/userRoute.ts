import { Router } from "express";
import { userRouter } from "../../controllers/userController";
import { authorization } from "../../middlewares/authorization";
import { imageUploader } from "../../middlewares/imageUploader";
import { pdfUploader } from "../../middlewares/pdfUploader";
import { verifyToken } from "../../middlewares/verifyToken";

const router: Router = Router();

router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);
router.get("/user/confirm", userRouter.confirmUser);
router.get("/user/me", verifyToken, userRouter.getMe);
router.post(
  "/user/image/upload",
  imageUploader.single("profile"),
  userRouter.uploadProfileImage
);
router.post(
  "/user/resume/upload",
  pdfUploader.single("resume"),
  userRouter.uploadResumeFile
);

router.get(
  "/user/all",
  verifyToken,
  authorization(["admin"]),
  userRouter.getAllUsers
);

router.get(
  "/user/hrs",
  verifyToken,
  authorization(["admin", "hr"]),
  userRouter.getHrList
);

router.get(
  "/manager/jobs",
  verifyToken,
  authorization(["hr", "admin"]),
  userRouter.getJobsByHrId
);

router
  .route("/user/:userId")
  .get(verifyToken, authorization(["admin"]), userRouter.getUserById);

router
  .route("/user/promote/:userId")
  .patch(verifyToken, authorization(["admin"]), userRouter.makeUserAsHr);

router.route("/user/:userId").patch(verifyToken, userRouter.updateUserById);

export default router;
