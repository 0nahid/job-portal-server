import { Request, Response } from "express";
import { JobModel } from "../models/jobModel";

// post data
const createJob = async (req: Request, res: Response) => {
  try {
    const job = await JobModel.create(req.body);
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const jobRouter = { createJob };
