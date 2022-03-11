import React from 'react';

const Card = ({ colour, name }) => {
    return (
        <div className={`card m-3 ${colour}`} style={{ width: "10rem", height: "15rem", cursor: "pointer" }}>
            <img src={`https://avatars.dicebear.com/api/adventurer-neutral/${name}.svg`} className="card-img-top p-2" alt="...." />
            <div className="card-body">
                <h5 className="card-title text-center ">{name}</h5>
            </div>
        </div>
    )
};

export default Card;
