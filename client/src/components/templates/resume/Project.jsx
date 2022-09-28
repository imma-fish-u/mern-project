import React, { useState } from "react";
import { getPicturePath } from '../../../utils/utils';
import { nanoid } from "nanoid";
import Feild from "./Feild";
import DropDown from '../../utils/Dropdown';
import { HiDotsHorizontal, HiExternalLink } from 'react-icons/hi';
import ImgEditable from '../ImgEditable';

const defaultValues = {
    title: "",
    description: "",
    link: "",
    picture: "",
};

const Project = ({ item, addItem, deleteItem, editItem, mode }) => {
    const [project, setProject] = useState(item || { id: nanoid(), ...defaultValues });
    const [isEdit, setIsEdit] = useState(mode === "add");
    const [isOpenListMenu, setIsOpenListMenu] = useState(false);

    const handleOnChange = event => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    const handleClick = () => {
        if (isEdit)
            editItem(project)
        setIsEdit(isEdit => !isEdit)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(project);
    }

    return (
        <form className="project__card" onSubmit={handleSubmit}>
            {/* {(isEdit) ? 
                <ImgEditable 
                    isOpen={isEdit} 
                    newItem={project} 
                    setNewItem={setProject} 
                />
                :
                <img
                    className="input__image"
                    src={getPicturePath('project', project.picture)}
                    alt={`project`}
                /> 
            } */}
            <ImgEditable 
                isOpen={isEdit} 
                newItem={project} 
                setNewItem={setProject} 
            />
            <div className="project__info">
                <Feild
                    isEdit={isEdit}
                    name="title"
                    label="Название"
                    value={project.title}
                    onChange={handleOnChange}
                    placeholder="Enter Title"
                    className="project__card__title"
                />
                <Feild
                    isEdit={isEdit}
                    name="link"
                    label="Ссылка"
                    value={project.link}
                    onChange={handleOnChange}
                    placeholder="Enter Link"
                    isLink={true}
                    icon={<HiExternalLink />}
                    className="resume__container__project__card__link"
                />
                <Feild
                    isEdit={isEdit}
                    name="description"
                    label="Описание"
                    value={project.description}
                    onChange={handleOnChange}
                    placeholder="Enter Description"
                    className="project__card__description"
                />
            </div>
            {(["edit", "create"].includes(mode)) && (
                (!isEdit) ? 
                    <button
                        className={`resume__container__btn-menu resume__container__btn-menu-active`}
                        onClick={() => setIsOpenListMenu(!isOpenListMenu)}>
                        <HiDotsHorizontal />
                        <DropDown
                            top="30px"
                            right="0px"
                            isOpen={isOpenListMenu}
                            setIsOpen={setIsOpenListMenu}>
                                    <ul className="listmenu">
                                        <li className="listmenu__item">
                                            <button className="resume__container__btn__primary" onClick={handleClick}
                                                disabled={!(project.title && project.description && project.link) && isEdit}>
                                                Изменить
                                            </button>
                                        </li>
                                        <li className="listmenu__item listmenu__divider"></li>
                                        <li className="listmenu__item">
                                            <button className="resume__container__btn__secondary" onClick={() => deleteItem(project._id)}>
                                                Удалить
                                            </button>
                                        </li>  
                                    </ul>
                        </DropDown>
                    </button>
                    :
                    <div className="resume__container__btns">
                        <button className="resume__container__btn__primary" type="submit"
                            disabled={!(project.title && project.description && project.link)}
                            onClick={handleClick}>
                            Сохранить
                        </button>
                        <button className="resume__container__btn__secondary" onClick={() => addItem("-")}>
                            Отмена
                        </button>
                    </div>
            )}
            {(mode === "add") && (
                <div className="resume__container__btns">
                    <button className="resume__container__btn__primary" type="submit"
                        disabled={!(project.title && project.description && project.link)}
                        onClick={() => addItem(project)}>
                        Добавить
                    </button>
                    <button className="resume__container__btn__secondary" onClick={() => addItem("-")}>
                        Отмена
                    </button>
                </div>
            )}
        </form>
    );
};
export default Project;
