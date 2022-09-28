import React, { useEffect, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import Modal from '../../utils/Modal';
import { MdImage, MdLock } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard } from '../../../redux/actions/board.action';
import Button from '../../utils/Button';
import ImgEditable from '../ImgEditable';

const ModalCreateBoard = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const [newBoard, setNewBoard] = useState({
        name: '',
        picture: '',
        isPrivate: false,
        owner: user._id,
    });

    useEffect(() => {
        if (!isOpen) {
            setNewBoard({
                name: '',
                picture: '',
                isPrivate: false,
                owner: '',
            });
        }
    }, [isOpen]);

    const handleCreateBoard = () => {
        const data = new FormData();
        data.append('name', newBoard.name);
        data.append('picture', newBoard.picture);
        data.append('directory', 'board-picture');
        data.append('isPrivate', newBoard.isPrivate);
        data.append('owner', user._id);
        setIsOpen(false);
        dispatch(createBoard(data));
    };

    return (
        <>
            <Modal
                hasCloseButton={true}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                hasChoiceButton={true}
                btnConfirmIcon={<RiAddFill />}
                btnConfirmMessage="Создать"
                confirmFunction={() => handleCreateBoard()}>
                <div className="createboardmodal">
                    <ImgEditable 
                        isOpen={isOpen} 
                        newItem={newBoard} 
                        setNewItem={setNewBoard} 
                    />
                    <input
                        value={newBoard.name}
                        onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
                        maxLength="20"
                        className="createboardmodal__input__name"
                        type="text"
                        placeholder="Название..."
                    />
                    <div className="createboardmodal__button__wrapper">
                        <Button className="createboardmodal__button__wrapper__item">
                            <MdImage className="createboardmodal__button__wrapper__item__icon" />{' '}
                            Обложка
                        </Button>
                        <Button
                            className={`createboardmodal__button__wrapper__item ${
                                newBoard.isPrivate ? 'isStateActiveCreateBoard' : ''
                            }`}
                            onClick={() =>
                                setNewBoard((oldNewBoard) => {
                                    oldNewBoard.isPrivate = !oldNewBoard.isPrivate;
                                    return { ...oldNewBoard };
                                })
                            }>
                            <MdLock className="createboardmodal__button__wrapper__item__icon" />{' '}
                            Закрытый
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalCreateBoard;
