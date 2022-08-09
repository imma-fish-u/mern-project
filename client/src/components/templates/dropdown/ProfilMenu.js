import React, { useState } from 'react';
import DropDown from '../../utils/Dropdown';
import { FaUserAlt } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../../utils/utils';
import Notifications from '../modal/Notifications';
import { removeCookie } from '../../../utils/utils';

const ProfilMenu = ({ isOpen, setIsOpen }) => {
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const user = useSelector((state) => state.userReducer);

    return (
        <>
            <Notifications isOpen={isOpenNotification} setIsOpen={setIsOpenNotification} />

            <DropDown
                contentClass="profilmenu"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                top="60px"
                right="10px">
                <div>
                    <ul className="profilmenu__navlist">
                        <li>
                            <Link to={`/profile/view/:${user._id}`} className="profilmenu__navlist__item">
                                <FaUserAlt className="profilmenu__navlist__item__icon" />
                                <p>Мой профиль</p>
                            </Link>
                        </li>
                        <li onClick={() => setIsOpenNotification(true)}>
                            <button className="profilmenu__navlist__item">
                                <MdNotifications className="profilmenu__navlist__item__icon" />
                                <p>Уведомления</p>
                                {!isEmpty(user.notifications) && (
                                    <span
                                        className="bubble-notifications"
                                        style={{
                                            fontSize: user.notifications.length > 99 && '0.6rem',
                                        }}>
                                        {user.notifications.length > 99
                                            ? '99+'
                                            : user.notifications.length}
                                    </span>
                                )}
                            </button>
                        </li>
                        <li className="profilmenu__navlist__divider"></li>
                        <li>
                            <button
                                className="profilmenu__navlist__item"
                                onClick={() => {
                                    removeCookie();
                                    document.location.reload();
                                }}>
                                <RiLogoutBoxRFill className="profilmenu__navlist__item__icon profilmenu__navlist__item__icon--logout" />
                                <p>Выйти</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </DropDown>
        </>
    );
};

export default ProfilMenu;
