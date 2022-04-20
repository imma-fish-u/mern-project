import React, { useEffect, useState, useRef } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { addResume, updateResume, deleteResume } from '../redux/actions/resume.actions';
import { Link, useLocation } from 'react-router-dom';

import PageTemplate from '../components/templates/PageTemplate';
import Error from './Error';
import ItemList from "../components/templates/resume/ItemList";
import Project from "../components/templates/resume/Project"
import PersonalInfo from '../components/templates/resume/PersonalInfo';
import Skills from '../components/templates/resume/Skills';

const Resume = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const resume = useSelector((state) => state.resumeReducer.current);

  const [personalInfo, setPersonalInfo] = useState({
    name: resume?.name || "",
    owner: resume?.owner || "",
    telegram: resume?.telegram || "",
  });
  const [projectList, setProjectList] = useState(resume?.projectList || []);
  const [skillList, setSkillList] = useState(resume?.skillList || []);
  const [mode, setMode] = useState("");

  const url_split = useRef(null);
  let location = useLocation();

  useEffect(() => {
    url_split.current = location.pathname.split('/');
    setMode(url_split.current[2]);

    /* if (url_split.current[3]) {
         dispatch(setCurrent(url_split.current[3].slice(1)));
         console.log(resume);
         if (resume) {
             setPersonalInfo({
                 name: resume?.name,
                 owner: resume?.owner,
                 telegram: resume?.telegram,
             });
             setProjectList(resume?.projectList);
             setSkillList(resume?.skillList);
             headerElement.name = resume?.name;
         }
     }*/
  }, [dispatch, location]);

  const handleSave = () => {
    if (mode === "edit") {
      const resume = { _id: url_split.current[3].slice(1), personalInfo, projectList, skillList };
      dispatch(updateResume(resume));
    }
  }

  const handleCreate = () => {
    const owner = user._id;
    console.log({ owner, personalInfo, projectList, skillList });
    const data = { owner, personalInfo, projectList, skillList };

    dispatch(addResume(data));
  }

  const handleDelete = () => {
    if (url_split.current[3])
      dispatch(deleteResume(url_split.current[3].slice(1)))
  }

  return (
    <>
      {resume === 'RESUME_ERROR' ? (
        <Error
          title="Resume Error"
          text="Resume not found"
          link="/profiles"
        />
      ) : (
        <PageTemplate
          headerElement={{
            name: "",
            link: "/profiles",
            text: "All resumes",
          }}
          pageTitle={`Resume - ${resume?.name}`}
          isHeaderElement={true}>
          <PersonalInfo mode={mode} personalInfo={personalInfo} onChange={setPersonalInfo} />
          <ItemList
            data={projectList}
            onChange={setProjectList}
            mode={mode}
            name={"Projects"}
            passedItem={Project}
          />
          <Skills
            mode={mode}
            skillList={skillList}
            onChange={setSkillList}
          />
          <div className="d-flex justify-content-end my-5">
            {mode === "create" ?
              <Link to={`/profile/view/:${resume?._id}`} className="btn btn-success" onClick={handleCreate}
                disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                Create
              </Link>
              :
              <Link to={`/profile/${mode === "edit" ? "view" : "edit"}/:${resume?._id}`} className="btn btn-primary" onClick={handleSave}
                disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== "")) && mode === "edit"}>
                {mode === "edit" ? "Save" : "Edit"}
              </Link>
            }
            <Link to="/profiles/" className="btn btn-danger ml-2" onClick={handleDelete}>
              Delete
            </Link>
            <Link to="/profiles/">
              <button className="btn btn-dark ml-2">
                Home
              </button>
            </Link>
          </div>
        </PageTemplate>
      )};
    </>
  )
};

export default connect()(Resume);

