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
        <div className="my-3 border p-3">
            <div className="d-flex justify-content-between mb-3">
                <span className="h3 m-0">{name}</span>
                {isEdit && <button className="btn btn-success" onClick={() => setAdd(add => !add)}>+</button>}
            </div>

            {data.length > 0 ? (
                data.map((item, index) => (
                    <PassedItem
                        key={item.id}
                        item={item}
                        deleteItem={deleteItem}
                        editItem={editItem}
                        mode={mode}
                    />
                ))
            ) : (
                <div className="text-center d-flex justify-content-center align-items-center bg-light my-3" style={{ height: '100px' }}>
                    <span>{`No ${name.toLowerCase()} added .`}</span>
                </div>
            )
            }
            {add && <PassedItem addItem={addItem} mode={"add"} />}
        </div>
    );
};

export default ItemList;
