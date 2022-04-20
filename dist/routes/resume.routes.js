"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = require("./common.routes.config");
const resume_controller_1 = require("../controllers/resume.controller");
class ResumeRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'ResumeRoutes');
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.route('/api/resume/create').post(resume_controller_1.ResumeController.create);
        this.app.route('/api/resume/getallresumes').get(resume_controller_1.ResumeController.getAllResumes);
        this.app.route('/api/resume/getresume/:id').get(resume_controller_1.ResumeController.getResume);
        this.app.route('/api/resume/update/:id').put(resume_controller_1.ResumeController.update);
        this.app.route('/api/resume/delete/:id').delete(resume_controller_1.ResumeController.delete);
        return this.app;
    }
}
exports.default = ResumeRoutes;
