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
    const { name, telegram } = personalInfo;

    try {
      const resume = await Utils.toObject(
        await ResumeModel.create({
          name,
          owner,
          telegram,
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
      const resumeID = req.params.id;

      await ResumeModel.findByIdAndDelete(resumeID);

      const user = await UserModel.findByIdAndUpdate(resumeID, {
        $pull: { resume: resumeID },
      });

      res.status(200).send(user);
    } catch (err) {
      const errors = ErrorManager.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { _id, personalInfo, projectList, skillList } = req.body;
      console.log(personalInfo)
      const newResume = await ResumeModel.findOneAndReplace({ _id: _id }, {
        _id: _id,
        name: personalInfo.name, 
        owner: personalInfo.owner,
        telegram: personalInfo.telegram,
        projectList: projectList,
        skillList: skillList,
      });
      console.log()
      res.status(200).send(newResume);
    } catch (err) {
      const errors = ErrorManager.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async getResume(req: Request, res: Response) {
    try {
      const resumeID = req.params.id;
      const resume = Utils.toObject(await ResumeModel.findById(resumeID));

      const userPic = await Utils.toObject(
        await UserModel.findById(resume.owner).select('picture')
      );

      res.status(200).send({ userPic, ...resume });
    } catch (err) {
        const errors = ErrorManager.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
        console.log(err);
        res.sendStatus(500);
    }
  }
}