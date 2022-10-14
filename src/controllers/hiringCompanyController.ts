import { Request, Response } from "express";
import { highringCompanyModel } from "../models/hiringCompanyModel";

// post data
const createHrCompany = async (req: Request, res: Response) => {
  try {
    const job = await highringCompanyModel.create(req.body);
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get data
const getHrCompanies = async (req: Request, res: Response) => {
  try {
    const job = await highringCompanyModel
      .find({})
      .populate("hiringManager.id", "userName email firstName lastName image");
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get data by id
const getHrCompanyById = async (req: Request, res: Response) => {
  try {
    const job = await highringCompanyModel
      .findById(req.params.id)
      .populate("hiringManager.id", "userName email firstName lastName image")
      .populate({
        path: "availableJobs",
        populate: {
          path: "hiringManager.id",
        },
      });
    res.status(200).send({
      message: "Job",
      job,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const hiringRouter = {
  createHrCompany,
  getHrCompanies,
  getHrCompanyById,
};
