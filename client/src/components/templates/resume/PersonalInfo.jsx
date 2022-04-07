import React from 'react';
import Feild from './Feild';

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
                label="Name"
                value={personalInfo.name}
                onChange={handleOnChange}
                placeholder="Enter Name"
            />
            <Feild
                isEdit={isEdit}
                name="telegram"
                label="Telegram Nick"
                value={personalInfo.telegram}
                onChange={handleOnChange}
                placeholder="Enter Telegram Nick"
            />
        </div>)
}

export default PersonalInfo;
