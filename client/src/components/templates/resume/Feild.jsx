import React from 'react';
import { Link } from 'react-router-dom';

const Feild = ({ isEdit, isLink = false, name, ...rest }) => {
    return <>
        {isEdit ? (
                name === "description" ? (
                    <textarea {...rest} className='input' name={name} required />
                ) : (
                    <input {...rest} className='input' name={name} required />
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


