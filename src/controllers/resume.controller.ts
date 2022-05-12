import { Request, Response } from 'express';
import { MongooseDocument, isValidObjectId } from 'mongoose';
import UserModel from '../models/user.model';
import ResumeModel, { IResume } from '../models/resume.model';
import ErrorManager from '../utils/ErrorManager';
import FileManager from '../utils/FileManager';
import Utils from '../utils/utils';


export class ResumeController {
  public static async create(req: Request, res: Response) {
    const { owner, personalInfo, projectList, skillList } = req.body;
    const { name, telegram, github } = personalInfo;

    try {
      const resume = await Utils.toObject(
        await ResumeModel.create({
          name,
          owner,
          telegram,
          github,
          projectList,
          skillList
        })
      );

      const test = await UserModel.findByIdAndUpdate(resume.owner, {
        $set: { resume: resume._id },
      });
      
      res.status(200).send(resume);
    } catch (err) {
      console.log('ERROR CREATE RESUME');
      console.log(err);
      res.status(500).send(err);
    }
  }

  public static async getAllResumes(req: Request, res: Response) {
    console.log('getAllResumes');

    const resumes: Array<any> = await Utils.toObject(
        await ResumeModel.find()
    );

    res.status(200).send(resumes);
  }

  public static async delete(req: Request, res: Response) {
    try {
      const userID = req.params.id;
      const user = Utils.toObject(await UserModel.findById(userID));
      await ResumeModel.findByIdAndDelete(user.resume);
      console.log(userID);
      const userUpdated = await UserModel.findByIdAndUpdate(userID, { resume: "" });

      res.status(200).send(userUpdated);
    } catch (err) {
      const errors = ErrorManager.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { _id, personalInfo, projectList, skillList } = req.body;
      const user = Utils.toObject(await UserModel.findById(_id));
      console.log(personalInfo)
      const newResume = await ResumeModel.findOneAndReplace({ _id: user.resume }, {
        name: personalInfo.name, 
        owner: personalInfo.owner,
        telegram: personalInfo.telegram,
        github: personalInfo.github,
        projectList: projectList,
        skillList: skillList,
      });
      console.log(newResume)
      res.status(200).send(newResume);
    } catch (err) {
      const errors = ErrorManager.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async getResume(req: Request, res: Response) {
    try {
      const userID = req.params.id;
      const user = Utils.toObject(await UserModel.findById(userID));
      const { pseudo, email, picture, resume } = user;
      if (resume) {
        const resumeData = Utils.toObject(await ResumeModel.findById(resume));
        res.status(200).send({ pseudo, email, picture, ...resumeData});
      } else {
        res.status(200).send({ pseudo, email, picture });
      } 
    } catch (err) {
        const errors = ErrorManager.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
        console.log(err);
        res.sendStatus(500);
    }
  }
}