import React, { useEffect, useState, useRef } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { addResume, updateResume, deleteResume } from '../redux/actions/resume.actions';
import { Link, useLocation, useHistory } from 'react-router-dom';

import Error from './Error';
import ItemList from "../components/templates/resume/ItemList";
import Project from "../components/templates/resume/Project"
import PersonalInfo from '../components/templates/resume/PersonalInfo';
import Skills from '../components/templates/resume/Skills';
import DropDown from '../components/utils/Dropdown';
import Modal from '../components/utils/Modal';

import { HiDotsHorizontal } from 'react-icons/hi';

const Resume = () => {
  const user = useSelector((state) => state.userReducer);
  const resume = useSelector((state) => state.resumeReducer.current);
  const dispatch = useDispatch();

  const [personalInfo, setPersonalInfo] = useState({
    name: resume?.name || "",
    owner: resume?.owner || "",
    telegram: resume?.telegram || "",
    github: resume?.github || "",
  });
  const [projectList, setProjectList] = useState(resume?.projectList || []);
  const [skillList, setSkillList] = useState(resume?.skillList || []);
  const [mode, setMode] = useState("");
  const [isOpenListMenu, setIsOpenListMenu] = useState(false);
  const [isOpenConfirmDeleteList, setIsOpenConfirmDeleteList] = useState(false);

  const url_split = useRef(null);
  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
    url_split.current = location.pathname.split('/');
    setMode(url_split.current[2]);
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
    if (url_split.current[3]) {
      dispatch(deleteResume(url_split.current[3].slice(1)));
      history.push(-1);
    }
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
        <div className="resume__container">
          <div>
            <Modal
                isOpen={isOpenConfirmDeleteList}
                setIsOpen={setIsOpenConfirmDeleteList}
                hasChoiceButton={true}
                confirmMessage="Вы уверены, что хотите удалить резюме ?"
                confirmFunction={() => handleDelete()}
            />
            <PersonalInfo mode={mode} personalInfo={personalInfo} onChange={setPersonalInfo} />
            <ItemList
              data={projectList}
              onChange={setProjectList}
              mode={mode}
              name={"Проекты"}
              passedItem={Project}
            />
            <Skills
              mode={mode}
              skillList={skillList}
              onChange={setSkillList}
            />
          </div>
          {mode ==="view" ? (
            <>
              <button
                className="resume__container__btn-menu list__top__btn-menu"
                onClick={() => setIsOpenListMenu(!isOpenListMenu)}>
                <HiDotsHorizontal />
              </button>
              <DropDown
              top="90px"
              right="-76px"
              isOpen={isOpenListMenu}
              setIsOpen={setIsOpenListMenu}>
                <ul className="listmenu">
                    <li className="listmenu__item">
                    {mode === "create" ?
                      <Link to={`/profile/view/:${resume?._id}`} className="listmenu__item__btn" onClick={handleCreate}
                        disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                        Создать
                      </Link>
                      :
                      <Link to={`/profile/${mode === "edit" ? "view" : "edit"}/:${resume?._id}`} className="listmenu__item__btn" onClick={handleSave}
                        disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== "")) && mode === "edit"}>
                        {mode === "edit" ? "Сохранить" : "Изменить"}
                      </Link>
                    }
                    </li>
                    <li className="listmenu__item listmenu__divider"></li>
                    <li className="listmenu__item">
                      <div
                        className="resume__container__btn__secondary listmenu__item__btn" 
                        onClick={() => setIsOpenConfirmDeleteList(true)}>
                        Удалить
                      </div>
                    </li>
                </ul>
              </DropDown>
            </>
          ) : (<>
            {mode === "create" ?
              <Link to={`/profile/view/:${resume?._id}`} className="resume__container__btn__primary" onClick={handleCreate}
                disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                Создать
              </Link>
              :
              <Link to={`/profile/${mode === "edit" ? "view" : "edit"}/:${resume?._id}`} className="resume__container__btn__primary" onClick={handleSave}
                disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== "")) && mode === "edit"}>
                {mode === "edit" ? "Сохранить" : "Изменить"}
              </Link>
            }
            <div
              className="resume__container__btn__secondary" 
              onClick={() => setIsOpenConfirmDeleteList(true)}>
              Удалить
            </div>
          </>)}
          
        </div>
      )}
    </>
  )
};

export default connect()(Resume);

