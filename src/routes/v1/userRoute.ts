import { Router } from "express";
import { userRouter } from "../../controllers/userController";
import { authorization } from "../../middlewares/authorization";
import { verifyToken } from "../../middlewares/verifyToken";

const router: Router = Router();

router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);
router.get("/user/confirm", userRouter.confirmUser);
router.get("/users/me", verifyToken, userRouter.getMe);

router.get(
  "/users/all",
  verifyToken,
  authorization(["admin"]),
  userRouter.getAllUsers
);

router.get(
  "/users/hrs",
  verifyToken,
  authorization(["admin", "hr"]),
  userRouter.getHrList
);

export default router;
