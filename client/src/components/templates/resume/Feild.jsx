import React from 'react';
import { Link } from 'react-router-dom';

const Feild = ({ isEdit, isLink = false, icon, name, ...rest }) => {
    return <>
        {isEdit ? (
                name === "description" ? (
                    <textarea {...rest} className='input' required />
                ) : (
                    <input {...rest} className='input' required />
                )
            ) : isLink ? ( 
                    <Link className='resume__container__link' to={rest.value}>{rest.value}</Link>   
                ) : (
                    <div className={rest.className}>{rest.value}</div>
                )
        }
    </>;
}

export default Feild;


