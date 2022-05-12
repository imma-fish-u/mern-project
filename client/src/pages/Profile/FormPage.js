
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../../utils/socket';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addChange } from '../../redux/actions/profile.action';
import { closeOnClickOutside, isEmpty } from '../../utils/utils';
import TextInput from '../../components/templates/profile/TextInput';
import SaveBar from '../../components/templates/profile/SaveBar';

const FormPage = (props) => {
  const { id } = useParams();
  const inputRenameRef = useRef();
  const renameFormRef = useRef();
  const [rename, setRename] = useState();
  const inputs = useSelector((state) => state.profileReducer.view);
  const [inputsState, setInputsState] = useState([]);
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState(false);
  const dispatch = useDispatch();

  // componentWillMount() {
  //   this.props.setUpEditableForm();
  // }

  // useEffect(() => {
  //     //dispatch(getBoard(id));
  //     return () => {
  //         dispatch(setNewEditableForm());
  //     };
  // }); //, [dispatch, id]

  const handleOpenListEdit = async () => {
      await setIsOpenProfileEdit(true);
      inputRenameRef.current.focus();
  };

  const handleProfileEdit = () => {
      socket.emit('edit profile', { rename });
      setIsOpenProfileEdit(false);
  };

  useEffect(() => {
      closeOnClickOutside(renameFormRef, setIsOpenProfileEdit);
  }, []);
  
  return (
    <div className="list__top">
    {isOpenProfileEdit ? (
        <form
            className="list__top__rename"
            onSubmit={() => handleProfileEdit()}
            ref={renameFormRef}>
            {
              inputs.map((input) => {
                return (
                  <TextInput
                    handleChange={(newValue) => dispatch(addChange('field', newValue))}
                    title={input.title}
                    value={input.field}
                  />
                );
              })
            }
            <div className="list__top__rename__btn-wrapper">
                <button
                    type="submit"
                    className="list__top__rename__btn-wrapper__check list__top__rename__btn-wrapper__btn">
                    Сохранить
                </button>
                <button
                    onClick={() => setIsOpenProfileEdit(false)}
                    type="button"
                    className="list__top__rename__btn-wrapper__cancel list__top__rename__btn-wrapper__btn">
                    Отменить
                </button>
            </div>
        </form>
    ) : (
        <span className="list__top__title">{'name'}</span>
    )}
    <button
        className="listmenu__item__btn"
        onClick={() => handleOpenListEdit()}>
        Edit
    </button>
    </div>
  )
}

export default FormPage;