import React, { useState } from "react";
import { nanoid } from "nanoid";
import Feild from "./Feild";

const defaultValues = {
    name: "",
    degree: "",
    year: ""
};

const Institute = ({ item, addItem, deleteItem, editItem, mode }) => {
    const [institute, setInstitute] = useState(item || { id: nanoid(), ...defaultValues });
    const [isEdit, setIsEdit] = useState(mode === "add");

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInstitute({ ...institute, [name]: value });
    };

    const handleClick = () => {
        if (isEdit)
            editItem(institute)
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
                        label="Institution Name"
                        value={institute.name}
                        onChange={handleOnChange}
                        placeholder="Enter Institution Name"
                    />
                </div>
                <div className="col" >
                    <Feild
                        isEdit={isEdit}
                        name="degree"
                        label="Degree"
                        value={institute.degree}
                        onChange={handleOnChange}
                        placeholder="Enter Degree"
                    />
                </div>
                <div className="col">
                    <Feild
                        isEdit={isEdit}
                        name="year"
                        label="Year of Passing"
                        value={institute.year}
                        onChange={handleOnChange}
                        placeholder="Year"
                        type="number"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                {(mode === "add") && (
                    <>
                        <button className="mr-2 btn btn-primary" onClick={() => addItem(institute)}
                            disabled={!(institute.name && institute.degree && institute.year)}>
                            Add Institute
                        </button>
                        <button className=" btn btn-danger" onClick={() => addItem("-")}>
                            Cancel
                        </button>
                    </>

                )}
                {(["edit", "create"].includes(mode)) && (
                    <>
                        <button className="btn btn-primary mr-2" onClick={handleClick}
                            disabled={!(institute.name && institute.degree && institute.year) && isEdit}>
                            {isEdit ? "Save" : "Edit"}
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteItem(institute.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};
export default Institute;
