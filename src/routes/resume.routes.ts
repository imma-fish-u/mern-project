import { CommonRoutesConfig } from './common.routes.config';
import { Application } from 'express';
import { ResumeController } from '../controllers/resume.controller';

export default class ResumeRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'ResumeRoutes');

    this.configureRoutes();
  }

  configureRoutes() {
    this.app.route('/api/resume/create').post(ResumeController.create);
    this.app.route('/api/resume/getallresumes').get(ResumeController.getAllResumes);
    this.app.route('/api/resume/getresume/:id').get(ResumeController.getResume);
    this.app.route('/api/resume/update/:id').put(ResumeController.update);
    this.app.route('/api/resume/delete/:id').delete(ResumeController.delete);

    return this.app;
  }
}