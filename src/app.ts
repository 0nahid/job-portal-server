import cors from "cors";
import "dotenv/config";
import express, { Application, Request, Response } from "express";
const app: Application = express();

/* middleware  */
app.use(cors());
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");

/* here will be all the imports routes */

import jobRoute from "./routes/v1/jobRouter";
import hiringRoute from "./routes/v1/hiringRouter";
import userRoute from "./routes/v1/userRoute";
import availableJobsRoute from "./routes/v1/availableJobsRoute";

/* here will be the all the routes */
app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

/* Here is the User Routes */
app.use("/api/v1/jobs", jobRoute);
app.use("/api/v1/hrcompany", hiringRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/availablejobs", availableJobsRoute);

// 404 response
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
    status: 404,
  });
});
export { app };
