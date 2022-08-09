import React, { useState } from "react";

import { nanoid } from "nanoid";
import Feild from "./Feild";
import DropDown from '../../utils/Dropdown';
import { HiDotsHorizontal, HiExternalLink } from 'react-icons/hi';


const defaultValues = {
    title: "",
    description: "",
    link: "",
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
    }

    return (
        <form className="project__card" onSubmit={handleSubmit}>
            <div className="project__info">
                {/* <EditableImg isEdit={isEdit} onChange={handleOnChange}/> */}
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
                                            {isEdit ? "Сохранить" : "Изменить"}
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
            )}
            {(mode === "add") && (
                <>
                    <button className="resume__container__btn__primary" type="submit"
                        disabled={!(project.title && project.description && project.link)}
                        onClick={() => addItem(project)}>
                        Добавить
                    </button>
                    <button className="resume__container__btn__secondary" onClick={() => addItem("-")}>
                        Отмена
                    </button>
                </>
            )}
        </form>
    );
};
export default Project;
