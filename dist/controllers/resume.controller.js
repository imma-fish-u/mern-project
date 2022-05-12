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
                const userID = req.params.id;
                const user = utils_1.default.toObject(yield user_model_1.default.findById(userID));
                yield resume_model_1.default.findByIdAndDelete(user.resume);
                console.log(userID);
                const userUpdated = yield user_model_1.default.findByIdAndUpdate(userID, { resume: "" });
                res.status(200).send(userUpdated);
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
                const user = utils_1.default.toObject(yield user_model_1.default.findById(_id));
                console.log(personalInfo);
                const newResume = yield resume_model_1.default.findOneAndReplace({ _id: user.resume }, {
                    name: personalInfo.name,
                    owner: personalInfo.owner,
                    telegram: personalInfo.telegram,
                    github: personalInfo.github,
                    projectList: projectList,
                    skillList: skillList,
                });
                console.log(newResume);
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
                const userID = req.params.id;
                const user = utils_1.default.toObject(yield user_model_1.default.findById(userID));
                const { pseudo, email, picture, resume } = user;
                if (resume) {
                    const resumeData = utils_1.default.toObject(yield resume_model_1.default.findById(resume));
                    res.status(200).send(Object.assign({ pseudo, email, picture }, resumeData));
                }
                else {
                    res.status(200).send({ pseudo, email, picture });
                }
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
