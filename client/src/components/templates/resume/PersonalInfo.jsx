import React from 'react';
import Feild from './Feild';

import { AiFillGithub } from 'react-icons/ai';
import { FaTelegram } from 'react-icons/fa';

const PersonalInfo = ({ mode, personalInfo, onChange }) => {

    const handleOnChange = event => {
        const { name, value } = event.target;
        onChange({ ...personalInfo, [name]: value });
    };

    const isEdit = ["edit", "create"].includes(mode)

    return (
        <div>
            <Feild
                isEdit={isEdit}
                name="name"
                label="Имя"
                value={personalInfo.name}
                onChange={handleOnChange}
                placeholder="Enter Name"
                className={"resume__container__personal__name"}
            />
            <Feild
                isEdit={isEdit}
                name="telegram"
                label="Telegram"
                value={`${personalInfo.telegram}`}
                onChange={handleOnChange}
                placeholder="Enter Telegram Link"
                isLink={true}
                icon={<FaTelegram />}
                className={"resume__container__personal__telegram"}
            />
            <Feild
                isEdit={isEdit}
                name="github"
                label="Github"
                value={`${personalInfo.github}`}
                onChange={handleOnChange}
                placeholder="Enter Github Link"
                isLink={true}
                icon={<AiFillGithub />}
                className={"resume__container__personal__github"}
            />
        </div>)
}

export default PersonalInfo;
