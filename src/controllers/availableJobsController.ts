import { Request, Response } from "express";
import { availableJobs } from "../models/avaiableJobsModel";
import { highringCompanyModel } from "../models/hiringCompanyModel";

// post data
const createAvailableJob = async (req: Request, res: Response) => {
  try {
    const job = await availableJobs.create(req.body);
    // update the hiring company's available jobs
    const hiringCompany = await highringCompanyModel.updateOne(
      { _id: req.body.hiringCompany.id },
      { $push: { availableJobs: job._id } }
    );
    res.status(201).send({
      message: "Job created successfully",
      job,
      hiringCompany,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all data
const getAllAvailableJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await availableJobs.find({});
    res.status(200).send({
      message: "All jobs",
      jobs,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// get data by id
const getAvailableJobById = async (req: Request, res: Response) => {
  try {
    const job = await availableJobs
      .findById(req.params.id)
      .populate({
        path: "hiringCompany.id",
        populate: {
          path: "availableJobs",
        },
      })
      .populate("hiringManager.id", "-password");
    res.status(200).send({
      message: "Job",
      job,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const availableJobsRouter = {
  createAvailableJob,
  getAllAvailableJobs,
  getAvailableJobById,
};
