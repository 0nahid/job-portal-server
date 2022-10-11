import { Request, Response } from "express";
import { highringCompanyModel } from "../models/hiringCompanyModel";


// post data
const hiringCreate = async (req: Request, res: Response) => {
  try {
    const job = await highringCompanyModel.create(req.body);
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const hiringRouter = { hiringCreate };
