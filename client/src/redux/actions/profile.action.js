import axios from '../../utils/axios';
import { errorsManager, successToast } from '../../utils/utils';
import { store } from '../store';
import { endLoading, loading } from './loader.action';

export const ADD_CHANGE = 'ADD_CHANGE';
export const SET_UP_EDIT_FORM = 'SET_UP_EDIT_FORM';
export const EDIT_FORM_PENDING = 'EDIT_FORM_PENDING';
export const EDIT_FORM_SUCCESS = 'EDIT_FORM_SUCCESS';

export const addChange = (fieldName, fieldValue) => ({
  type: ADD_CHANGE,
  fieldName,
  fieldValue
});

export const setNewEditableForm = form => ({
  type: SET_UP_EDIT_FORM,
  form,
});

export const editFormPending = () => ({
  type: EDIT_FORM_PENDING,
});

export const editFormSuccess = form => ({
  type: EDIT_FORM_SUCCESS,
  form
});