import React, { useState } from "react";

import { nanoid } from "nanoid";
import Feild from "./Feild";


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
        <form className="border p-2" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col" >
                    <Feild
                        isEdit={isEdit}
                        name="title"
                        label="Title"
                        value={project.title}
                        onChange={handleOnChange}
                        placeholder="Enter Title"
                    />
                </div>
                <div className="col" >
                    <Feild
                        isEdit={isEdit}
                        name="description"
                        label="Description"
                        value={project.description}
                        onChange={handleOnChange}
                        placeholder="Enter Description"
                    />
                </div>
                <div className="col">
                    <Feild
                        isEdit={isEdit}
                        name="link"
                        label="Link"
                        value={project.link}
                        onChange={handleOnChange}
                        placeholder="Link"
                        type="number"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                {(mode === "add") && (
                    <>
                        <button className="mr-2 btn btn-primary" type="submit"
                            disabled={!(project.title && project.description && project.link)}
                            onClick={() => addItem(project)}>
                            Add Project
                        </button>
                        <button className=" btn btn-danger" onClick={() => addItem("-")}>
                            Cancel
                        </button>
                    </>

                )}
                {(["edit", "create"].includes(mode)) && (
                    <>
                        <button className="btn btn-primary mr-2" onClick={handleClick}
                            disabled={!(project.title && project.description && project.link) && isEdit}>
                            {isEdit ? "Save" : "Edit"}
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteItem(project._id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};
export default Project;
