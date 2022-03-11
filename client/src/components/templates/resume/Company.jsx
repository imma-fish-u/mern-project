import React, { useState } from "react";

import { nanoid } from "nanoid";
import Feild from "./Feild";


const defaultValues = {
    name: "",
    title: "",
    year: ""
};

const Company = ({ item, addItem, deleteItem, editItem, mode }) => {
    const [company, setCompany] = useState(item || { id: nanoid(), ...defaultValues });
    const [isEdit, setIsEdit] = useState(mode === "add");

    const handleOnChange = event => {
        const { name, value } = event.target;
        setCompany({ ...company, [name]: value });
    };

    const handleClick = () => {
        if (isEdit)
            editItem(company)
        setIsEdit(isEdit => !isEdit)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="border p-2" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <Feild
                        isEdit={isEdit}
                        name="name"
                        label="Company Name"
                        value={company.name}
                        onChange={handleOnChange}
                        placeholder="Enter Comapany Name"
                    />
                </div>
                <div className="col" >
                    <Feild
                        isEdit={isEdit}
                        name="title"
                        label="Title"
                        value={company.title}
                        onChange={handleOnChange}
                        placeholder="Enter Title"
                    />
                </div>
                <div className="col">
                    <Feild
                        isEdit={isEdit}
                        name="year"
                        label="Joining Year"
                        value={company.year}
                        onChange={handleOnChange}
                        placeholder="Year"
                        type="number"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                {(mode === "add") && (
                    <>
                        <button className="mr-2 btn btn-primary" type="submit"
                            disabled={!(company.name && company.title && company.year)}
                            onClick={() => addItem(company)}>
                            Add Company
                        </button>
                        <button className=" btn btn-danger" onClick={() => addItem("-")}>
                            Cancel
                        </button>
                    </>

                )}
                {(["edit", "create"].includes(mode)) && (
                    <>
                        <button className="btn btn-primary mr-2" onClick={handleClick}
                            disabled={!(company.name && company.title && company.year) && isEdit}>
                            {isEdit ? "Save" : "Edit"}
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteItem(company.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};
export default Company;
