import React from 'react';
import { getPicturePath } from '../../../utils/utils';

const Card = ({ name, picture, skillList }) => {
    //console.log(resume.picture);

    return (
        <>
            <img
                className="allresumes__container__items__img"
                src={getPicturePath('user', picture)}
                alt={`resume ${name}`}
            />
            <span className="allresumes__container__items__title">{name}</span>
            <ul className="allresumes__container__items__labels">
                { skillList.map(({ _id, value }) => (
                    <li key={_id} className="cardlabel allresumes__container__items__labels__skill">{ value }</li>
                ))}
            </ul>
        </>
    )
};

export default Card;
