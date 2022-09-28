import mongoose, { Schema } from "mongoose";

export interface IResume extends mongoose.Document {
  _id: string;
  name: string;
  owner: string;
  github: string;
  telegram: string;
  projectList: [IProjectList];
  skillList: [ISkillList];
}

export interface IProjectList extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  link: string;
  project: string;
}

export interface ISkillList extends mongoose.Document {
  label: string;
  value: string;
}

const ResumeSchema: Schema = new Schema (
  {
    name: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
    },
    github: {
      type: String,
    },
    owner: {
      type: String,
    },
    projectList: [
      {
        title: {
          type: String,
        },
        description: {
          type: String
        },
        link: {
          type: String,
        },
        picture: {
          type: String,
        },
      }
    ],
    skillList: [
      {
        label: {
          type: String,
        },
        value: {
          type: String,
        }
      }
    ]
  }
);

export default mongoose.model<IResume>('resume', ResumeSchema);