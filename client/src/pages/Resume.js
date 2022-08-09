import React, { useState } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { setCurrent, addResume, updateResume, deleteResume } from '../redux/actions/resume.actions';
import { Link } from 'react-router-dom';
import { getPicturePath } from '../utils/utils';
import Error from './Error';
import ItemList from "../components/templates/resume/ItemList";
import Project from "../components/templates/resume/Project"
import PersonalInfo from '../components/templates/resume/PersonalInfo';
import Skills from '../components/templates/resume/Skills';
import DropDown from '../components/utils/Dropdown';
import Modal from '../components/utils/Modal';

import { HiDotsHorizontal } from 'react-icons/hi';

const Resume = ({ mode, id, isMineResume }) => {
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
  const [isOpenListMenu, setIsOpenListMenu] = useState(false);
  const [isOpenConfirmDeleteList, setIsOpenConfirmDeleteList] = useState(false);

  const handleSave = () => {
    if (mode === "edit") {
      const resume = { _id: id, personalInfo, projectList, skillList };
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
    if (id) {
      dispatch(deleteResume(user._id));
      dispatch(setCurrent(id));
    }
  }

  console.log(isMineResume);

  return (
    <>
      {resume === 'RESUME_ERROR' ? (
        <Error
          title="Resume Error"
          text="Резюме не найдено"
          link="/profiles"
        />
      ) : (
        <div className="resume">
          <div className="resume__top">
            <img
              className="resume__top__img"
              src={getPicturePath('user', resume.picture)}
              alt={`profile ${resume.pseudo}`}
            />
            <div className="resume__top__wrapper">
              <h1 className="resume__top__title">@{resume.pseudo}</h1>
              <span className="resume__top__info">{resume.email}</span>
            </div>
          </div>
          {(resume._id) || (mode === "create") ? (
            <div className="resume__container">
              <div className="resume__container__info">
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
                {(["edit", "create"].includes(mode)) && (<>
                  {mode === "create" ?
                    <Link to={`/profile/view/:${user._id}`} className="resume__container__btn__primary" onClick={handleCreate}
                      disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                      Создать
                    </Link>
                    :
                    <Link to={`/profile/${mode === "edit" ? "view" : "edit"}/:${user._id}`} className="resume__container__btn__primary" onClick={handleSave}
                      disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== "")) && mode === "edit"}>
                      {mode === "edit" ? "Сохранить" : "Изменить"}
                    </Link>
                  }
                  <div
                    className="resume__container__btn__secondary" 
                    onClick={() => setIsOpenConfirmDeleteList(true)}>
                    Удалить
                  </div>
                </>
                )}
              </div>
              {mode === "view" && (
                <button
                  className={`resume__container__btn-menu ${(isMineResume) ? "resume__container__btn-menu-active" : ""}`}
                  onClick={() => setIsOpenListMenu(!isOpenListMenu)}>
                  <HiDotsHorizontal />
                  <DropDown
                    top="30px"
                    right="0px"
                    isOpen={isOpenListMenu}
                    setIsOpen={setIsOpenListMenu}>
                      <ul className="listmenu">
                          <li className="listmenu__item">
                          {mode === "create" ?
                            <Link to={`/profile/view/:${user._id}`} className="listmenu__item__btn" onClick={handleCreate}
                              disabled={!(projectList.length && skillList.length && Object.values(personalInfo).every(x => x !== ""))}>
                              Создать
                            </Link>
                            :
                            <Link to={`/profile/${mode === "edit" ? "view" : "edit"}/:${user._id}`} className="listmenu__item__btn" onClick={handleSave}
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
                </button>
              )}
            </div>
          ) : (
            <>
              <p>Резюме пока не было создано</p>
              <Link to={`/profile/create/:${user._id}`}>Создать резюме</Link>
            </>
          )}
        </div>  
      )}
    </>
  );
};

export default connect()(Resume);

