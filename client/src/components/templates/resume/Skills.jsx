import React from "react";
import CreatableSelect from "react-select/creatable";

import { skillOptions } from "../../data/skillOptions";

const Skills = ({ onChange, skillList, mode }) => {
    const isEdit = ["edit", "create"].includes(mode)
    return (
        <div>
            <div className="resume__container__title">Skills</div>
            <div>
                {isEdit ? (
                    <CreatableSelect
                        name="Навыки"
                        isMulti
                        placeholder="Enter your skills"
                        options={skillOptions}
                        onChange={onChange}
                        value={skillList}
                    />
                ) : (
                    <div className="">
                        {skillList.length > 0 ? (
                            skillList.map((skill) => skill.label).join(", ")
                        ) : (
                            <div className="no-items">No skills added.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Skills;
