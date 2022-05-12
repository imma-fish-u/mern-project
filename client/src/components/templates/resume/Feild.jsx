import React from 'react';
import { Link } from 'react-router-dom';

const Feild = ({ isEdit, label, isLink = false, icon, ...rest }) => {
    return <>
        {isEdit ? (
            <div className='resume__container__block'>
                <label className='categorytitle'>{label}</label>
                <input {...rest} className='list__top__rename__input' required />
            </div>
            ) : isLink ? ( 
                <div className='resume__container__link-block'>
                    <i className='resume__container__icon'>{icon}</i>
                    <Link className='resume__container__link' to={rest.value}>{rest.value}</Link>
                </div>    
                ) : (
                    <div className={rest.className}>{rest.value}</div>
                )
        }
    </>;
}

export default Feild;


