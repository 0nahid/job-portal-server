import cors from "cors";
import "dotenv/config";
import express, { Application, Request, Response } from "express";
const app: Application = express();

/* middleware  */
app.use(cors());
app.use(express.json());

/* express file system */
app.use("/uploads", express.static("uploads"));

// set the view engine to ejs
app.set("view engine", "ejs");

/* here will be all the imports routes */

import availableJobsRoute from "./routes/v1/availableJobsRoute";
import hiringRoute from "./routes/v1/hiringRouter";
import userRoute from "./routes/v1/userRoute";

/* here will be the all the routes */
app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

/* Here is the User Routes */
app.use("/api/v1/hrcompany", hiringRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/jobs", availableJobsRoute);

// 404 response
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
    status: 404,
  });
});
export { app };
