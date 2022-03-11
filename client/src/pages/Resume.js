import React, { useEffect, useState, useRef } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { addResume, updateResume, deleteResume } from '../redux/actions/resume.actions';

import ItemList from "../components/templates/resume/ItemList";
import Institute from "../components/templates/resume/Institute"
import Company from "../components/templates/resume/Company"
import PersonalInfo from '../components/templates/resume/PersonalInfo';
import Skills from '../components/templates/resume/Skills';

import { Link, useLocation } from 'react-router-dom';
//import { nanoid } from 'nanoid';

const defaultPersonalInfo = {
    name: "",
    email: "",
    address: "",
    phone: "",
};

const Resume = (resume) => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [personalInfo, setPersonalInfo] = useState(resume?.personalInfo || defaultPersonalInfo);
    const [institutionList, setInstitutionList] = useState(resume?.institutionList || []);
    const [experienceList, setExperienceList] = useState(resume?.experienceList || []);
    const [skillList, setSkillList] = useState(resume?.skillList || []);
    const [mode, setMode] = useState("")

    const url_split = useRef(null);

    //const navigate = useNavigate()
    let location = useLocation();

    useEffect(() => {
        url_split.current = location.pathname.split('/')
        dispatch(setMode(url_split.current[1]))
    }, [dispatch, location]);


    const handleSave = () => {
        if (mode === "edit")
            updateResume({ id: url_split.current[2], personalInfo, institutionList, experienceList, skillList })
        //navigate(`/${mode === "edit" ? "view" : "edit"}/${url_split.current[2]}`)
    }

    const handleCreate = () => {
        const id = user._id;
        addResume({ id, personalInfo, institutionList, experienceList, skillList })
        //navigate(`/view/${id}`)
    }

    const handleDelete = () => {
        if (url_split.current[2])
            deleteResume(url_split.current[2])
       // navigate(`/`)
    }

    return <div>
        <PersonalInfo mode={mode} personalInfo={personalInfo} onChange={setPersonalInfo} />
        <ItemList
            data={institutionList}
            onChange={setInstitutionList}
            mode={mode}
            name={"Education"}
            passedItem={Institute}
        />
        <ItemList
            data={experienceList}
            onChange={setExperienceList}
            mode={mode}
            name={"Experience"}
            passedItem={Company}
        />
        <Skills
            mode={mode}
            skillList={skillList}
            onChange={setSkillList}
        />
        <div className="d-flex justify-content-end my-5">
            {mode === "create" ? 
            <Link to={`/profileView/${user._id}`} className="btn btn-success" onClick={handleCreate}
                disabled={!(institutionList.length && experienceList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                Create
            </Link> 
            :
            <Link to={`/profile${mode === "edit" ? "View" : "Edit"}`} className="btn btn-primary" onClick={handleSave}
                disabled={!(institutionList.length && experienceList.length && skillList.length && Object.values(personalInfo).every(x => x !== "")) && mode === "edit"}>
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

