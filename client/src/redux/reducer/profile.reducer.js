import { ADD_CHANGE, SET_UP_EDIT_FORM, EDIT_FORM_PENDING, EDIT_FORM_SUCCESS } from '../actions/profile.action';

const initialState = {
  view : {
    status: null,
    data: {
      title: 'ORIGINAL TITLE',
      field: 'ZIZOU PRESIDENT',
    },
  }
};

export default function profileReducer(state = initialState.view, action) {
  switch (action.type) {
    case ADD_CHANGE:
      const newForm = { ...state.data };
      newForm[action.fieldName] = action.fieldValue;
      return {
        ...state,
        changed: true,
        data: newForm,
      };
    case SET_UP_EDIT_FORM:
      return {
        ...state,
        changed: false,
        data: action.form,
      };
    case EDIT_FORM_PENDING:
      return {
        ...state,
        status: EDIT_FORM_PENDING,
      };
    case EDIT_FORM_SUCCESS:
      return {
        ...state,
        changed: false,
        data: action.form,
        status: EDIT_FORM_SUCCESS,
      };
    default:
      return state;
  }
}
