import React, { useState } from "react";

import { nanoid } from "nanoid";
import Feild from "./Feild";
import { HiExternalLink } from 'react-icons/hi';


const defaultValues = {
    title: "",
    description: "",
    link: "",
};

const Project = ({ item, addItem, deleteItem, editItem, mode }) => {
    const [project, setProject] = useState(item || { id: nanoid(), ...defaultValues });
    const [isEdit, setIsEdit] = useState(mode === "add");

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
        <form className="resume__container__project" onSubmit={handleSubmit}>
            <Feild
                isEdit={isEdit}
                name="title"
                label="Название"
                value={project.title}
                onChange={handleOnChange}
                placeholder="Enter Title"
                className="resume__container__project__title"
            />
            <Feild
                isEdit={isEdit}
                name="description"
                label="Описание"
                value={project.description}
                onChange={handleOnChange}
                placeholder="Enter Description"
                className="resume__container__project__description"
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
                className="resume__container__project__link"
            />
            <div className="resume__container__project__btns">
                {(mode === "add") && (
                    <>
                        <button className="resume__container__btn__primary" type="submit"
                            disabled={!(project.title && project.description && project.link)}
                            onClick={() => addItem(project)}>
                            Добавить проект
                        </button>
                        <button className="resume__container__btn__secondary" onClick={() => addItem("-")}>
                            Отмена
                        </button>
                    </>

                )}
                {(["edit", "create"].includes(mode)) && (
                    <>
                        <button className="resume__container__btn__primary" onClick={handleClick}
                            disabled={!(project.title && project.description && project.link) && isEdit}>
                            {isEdit ? "Сохранить" : "Изменить"}
                        </button>
                        <button className="resume__container__btn__secondary" onClick={() => deleteItem(project._id)}>
                            Удалить
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};
export default Project;
