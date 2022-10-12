import { Router } from "express";
import { userRouter } from "../../controllers/userController";

const router: Router = Router();

router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);

export default router;
