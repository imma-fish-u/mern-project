import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import Button from '../components/utils/Button';
import { RiAddFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBoardByUserID, getAllBoard } from '../redux/actions/board.action';
import ModalCreateBoard from '../components/templates/modal/CreateBoard.jsx';
import BoardItem from '../components/templates/board/BoardItem';
import { isEmpty } from '../utils/utils';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const boards = useSelector((state) => state.boardReducer.boards);
    const [isOpenCreateBoard, setIsOpenCreateBoard] = useState(false);
    const [isMineBoards, setIsMineBoards] = useState(false);

    useEffect(() => {
        if (isMineBoards) dispatch(getAllBoardByUserID(user._id));
        else dispatch(getAllBoard());
    }, [dispatch, isMineBoards, user._id]);
    

    return (
        <>
            <ModalCreateBoard isOpen={isOpenCreateBoard} setIsOpen={setIsOpenCreateBoard} />

            <PageTemplate pageTitle="Allboards">
                <div className="allboards">
                    <div className="allboards__top">
                        <div className="allboards__top__menu">
                            <div className={`allboards__top__menu__btn allboards__top__menu__btn${isMineBoards ? "" : "__active"}`}>
                                <h2 className="allboards__top__title" onClick={() => setIsMineBoards(false)}>Открытые проекты</h2>
                            </div>
                            <div className={`allboards__top__menu__btn allboards__top__menu__btn${isMineBoards ? "__active" : ""}`}>
                                <h2 className="allboards__top__title" onClick={() => setIsMineBoards(true)}>Мои проекты</h2>
                            </div>
                        </div>
                        <Button
                            className="allboards__top__btn"
                            onClick={() => setIsOpenCreateBoard(true)}>
                            <RiAddFill className="allboards__top__btn__icon" />
                            <span className="allboards__top__btn__label">Добавить</span>
                        </Button>
                    </div>

                    <div className="allboards__container">
                        {!isEmpty(boards) &&
                            boards.map((board) => {
                                return <BoardItem key={board._id} {...board} />;
                            })}
                    </div>
                </div>
            </PageTemplate>
        </>
    );
};

export default Home;
