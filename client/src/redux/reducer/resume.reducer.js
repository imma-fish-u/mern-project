import {
  GET_RESUMES,
  SET_LOADING,
  RESUMES_ERROR,
  ADD_RESUME,
  DELETE_RESUME,
  UPDATE_RESUME,
  SET_CURRENT,
} from '../actions/resume.actions';

const initialState = {
  resumes: [],
  current: null,
  loading: false,
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RESUMES:
      return {
        ...state,
        resumes: action.payload,
        loading: false
      };
    case ADD_RESUME:
      return {
        ...state,
        resumes: [...state.resumes, action.payload],
        loading: false
      };
    case DELETE_RESUME:
      return {
        ...state,
        resumes: state.resumes.filter(resume => resume.id !== action.payload),
        loading: false
      };
    case UPDATE_RESUME:
      return {
        ...state,
        resumes: state.resumes.map(resume =>
          resume.id === action.payload.id ? action.payload : resume
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESUMES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
