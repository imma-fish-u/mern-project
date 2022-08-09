import React, { useState } from "react";

const ItemList = ({ name, mode, data, onChange, passedItem }) => {

    const PassedItem = passedItem;
    const [add, setAdd] = useState(false);
    const isEdit = ["edit", "create"].includes(mode)

    const addItem = (item) => {
        if (item !== "-")
            onChange([...data, item]);
        setAdd(false)
    };

    const deleteItem = (id) => {
        onChange(data.filter((item) => item.id !== id)
        );
    };

    const editItem = (item) => {
        onChange(data.map(x => x.id === item.id ? item : x))
    }

    return (
        <div className="resume__container__block project">
            <div className="project__header">
                <div className={`resume__container__title`}>{name}</div>
                {isEdit && <button className="project__btn-add" onClick={() => setAdd(add => !add)}>+</button>}
            </div>

            <div className="project__card-wrapper">
                {data.length > 0 ? (
                    data.map((item) => (
                        <PassedItem
                            key={item.id}
                            item={item}
                            deleteItem={deleteItem}
                            editItem={editItem}
                            mode={mode}
                        />
                    ))
                ) : (
                    <div className="project__text-empty" style={{ height: '100px' }}>
                        <span>{`${name} не добавлены.`}</span>
                    </div>
                )
                }
                {add && <PassedItem addItem={addItem} mode={"add"} />}
            </div>
        </div>
    );
};

export default ItemList;
