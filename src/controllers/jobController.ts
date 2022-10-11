import { Request, Response } from "express";

// post data
const createJob = async (req: Request, res: Response) => {
  res.send("It's working! Yayyy");
};

export const jobRouter = { createJob };
