import React from 'react';
import Feild from './Feild';
import CategoryTitle from '../../layouts/CategoryTitle';

import { AiFillGithub } from 'react-icons/ai';
import { FaTelegram, FaUserCircle } from 'react-icons/fa';

const PersonalInfo = ({ mode, personalInfo, onChange }) => {

    const handleOnChange = event => {
        console.log(event.target)
        const { name, value } = event.target;
        onChange({ ...personalInfo, [name]: value });
        console.log({ ...personalInfo, [name]: value })
    };

    const isEdit = ["edit", "create"].includes(mode)

    return (
        <div className="resume__container__block personal">
            <div className="personal__wrapper">
                <CategoryTitle icon={<FaUserCircle />} title="Имя" withMarginBottom={false}/>
                <Feild
                    isEdit={isEdit}
                    name="name"
                    value={personalInfo.name}
                    onChange={handleOnChange}
                    placeholder="Enter Name"
                    className={"personal__name"}
                />
            </div>
            <div className="personal__wrapper">
                <CategoryTitle icon={<FaTelegram />} title="Telegram" withMarginBottom={false}/>
                <Feild
                    isEdit={isEdit}
                    name="telegram"
                    value={`${personalInfo.telegram}`}
                    onChange={handleOnChange}
                    placeholder="Enter Telegram Link"
                    isLink={true}
                    className={"personal__telegram"}
                />
            </div>
            <div className="personal__wrapper">
                <CategoryTitle icon={<AiFillGithub />} title="Github" withMarginBottom={false}/>
                <Feild
                    isEdit={isEdit}
                    name="github"
                    value={`${personalInfo.github}`}
                    onChange={handleOnChange}
                    placeholder="Enter Github Link"
                    isLink={true}
                    className={"personal__github"}
                />
            </div>
        </div>)
}

export default PersonalInfo;
