import { Router } from "express";
import { userRouter } from "../../controllers/userRoute";

const router: Router = Router();

router.post("/signup", userRouter.createUser);

export default router;
