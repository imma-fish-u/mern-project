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
                name="email"
                label="Email"
                value={personalInfo.email}
                onChange={handleOnChange}
                placeholder="Enter Email"
                type="email"
            />
            <div className="form-group">
                <label className='font-weight-bold mb-1'>Address</label>
                {isEdit ? <textarea className="form-control w-100" rows="3" name="address"
                    value={personalInfo.address}
                    onChange={handleOnChange}
                    placeholder="Enter Address"
                ></textarea>
                    : <div className="feild-value">{`${personalInfo.address}`}</div>
                }
            </div>
            <Feild
                isEdit={isEdit}
                name="phone"
                label="Phone Number"
                value={personalInfo.phone}
                onChange={handleOnChange}
                placeholder="Enter Phone Number"
                type="phone"
            />
        </div>)
}

export default PersonalInfo;
