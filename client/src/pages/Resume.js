import React, { useEffect, useState, useRef } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { addResume, updateResume, deleteResume } from '../redux/actions/resume.actions';

import ItemList from "../components/templates/resume/ItemList";
import Company from "../components/templates/resume/Project"
import PersonalInfo from '../components/templates/resume/PersonalInfo';
import Skills from '../components/templates/resume/Skills';

import { Link, useLocation } from 'react-router-dom';
//import { nanoid } from 'nanoid';

const defaultPersonalInfo = {
    name: "",
    telegram: "",
};

const Resume = (resume) => {
    const user = useSelector((state) => state.userReducer);
    //const dispatch = useDispatch();
    const [personalInfo, setPersonalInfo] = useState(resume?.personalInfo || defaultPersonalInfo);
    const [projectList, setProjectList] = useState(resume?.projectList || []);
    const [skillList, setSkillList] = useState(resume?.skillList || []);
    const [mode, setMode] = useState("")

    const url_split = useRef(null);

    //const navigate = useNavigate()
    let location = useLocation();

    useEffect(() => {
        let cleanupFunction = false;
        let currMode = null;

        url_split.current = location.pathname.split('/');
        currMode = url_split.current[2];

        if(!cleanupFunction) setMode(currMode);

        return () => cleanupFunction = true;
    }, [location]);

    console.log(mode);

    const handleSave = () => {
        if (mode === "edit")
            updateResume({ id: url_split.current[2], personalInfo, projectList, skillList })
        //navigate(`/${mode === "edit" ? "view" : "edit"}/${url_split.current[2]}`)
    }

    const handleCreate = () => {
        const id = user._id;
        addResume({ id, personalInfo, projectList, skillList })
        //navigate(`/view/${id}`)
    }

    const handleDelete = () => {
        if (url_split.current[3])
            deleteResume(url_split.current[3])
       // navigate(`/`)
    }

    return <div>
         {mode}
        <PersonalInfo mode={mode} personalInfo={personalInfo} onChange={setPersonalInfo} />
        <ItemList
            data={projectList}
            onChange={setProjectList}
            mode={mode}
            name={"Projects"}
            passedItem={Company}
        />
        <Skills
            mode={mode}
            skillList={skillList}
            onChange={setSkillList}
        />
        <div className="d-flex justify-content-end my-5">
            {mode === "create" ? 
            <Link to={`/profile/view/:${user._id}`} className="btn btn-success" onClick={handleCreate}
                disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                Create
            </Link> 
            :
            <Link to={`/profile/${mode === "edit" ? "view" : "edit"}/:${user._id}`} className="btn btn-primary" onClick={handleSave}
                disabled={!(projectList.length  && skillList.length && Object.values(personalInfo).every(x => x !== "")) && mode === "edit"}>
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
    </div>;
};

export default connect()(Resume);

