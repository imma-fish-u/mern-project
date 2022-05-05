"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const resume_model_1 = __importDefault(require("../models/resume.model"));
const ErrorManager_1 = __importDefault(require("../utils/ErrorManager"));
const utils_1 = __importDefault(require("../utils/utils"));
class ResumeController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { owner, personalInfo, projectList, skillList } = req.body;
            const { name, telegram, github } = personalInfo;
            try {
                const resume = yield utils_1.default.toObject(yield resume_model_1.default.create({
                    name,
                    owner,
                    telegram,
                    github,
                    projectList,
                    skillList
                }));
                const test = yield user_model_1.default.findByIdAndUpdate(resume.owner, {
                    $set: { resume: resume._id },
                });
                res.status(200).send(resume);
            }
            catch (err) {
                console.log('ERROR CREATE RESUME');
                console.log(err);
                res.status(500).send(err);
            }
        });
    }
    static getAllResumes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getAllResumes');
            const resumes = yield utils_1.default.toObject(yield resume_model_1.default.find());
            res.status(200).send(resumes);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resumeID = req.params.id;
                yield resume_model_1.default.findByIdAndDelete(resumeID);
                const user = yield user_model_1.default.findByIdAndUpdate(resumeID, {
                    $pull: { resume: resumeID },
                });
                res.status(200).send(user);
            }
            catch (err) {
                const errors = ErrorManager_1.default.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
                console.log(err);
                res.sendStatus(500);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, personalInfo, projectList, skillList } = req.body;
                console.log(personalInfo);
                const newResume = yield resume_model_1.default.findOneAndReplace({ _id: _id }, {
                    _id: _id,
                    name: personalInfo.name,
                    owner: personalInfo.owner,
                    telegram: personalInfo.telegram,
                    github: personalInfo.github,
                    projectList: projectList,
                    skillList: skillList,
                });
                console.log();
                res.status(200).send(newResume);
            }
            catch (err) {
                const errors = ErrorManager_1.default.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
                console.log(err);
                res.sendStatus(500);
            }
        });
    }
    static getResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resumeID = req.params.id;
                const resume = utils_1.default.toObject(yield resume_model_1.default.findById(resumeID));
                // const userPic = await Utils.toObject(
                //   await UserModel.findById(resume.owner).select('picture')
                // );
                res.status(200).send(Object.assign({}, resume));
            }
            catch (err) {
                const errors = ErrorManager_1.default.checkErrors(['RESUME_UNKNOWN', 'INVALID_ID'], err);
                console.log(err);
                res.sendStatus(500);
            }
        });
    }
}
exports.ResumeController = ResumeController;
