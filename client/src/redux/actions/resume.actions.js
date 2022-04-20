import axios from '../../utils/axios';
import { errorsManager, successToast } from '../../utils/utils';
import { endLoading, loading } from './loader.action';

export const GET_RESUMES = 'GET_RESUMES';
export const ADD_RESUME = 'ADD_RESUME';
export const DELETE_RESUME = 'DELETE_RESUME';
export const SET_CURRENT = 'SET_CURRENT';
export const UPDATE_RESUME = 'UPDATE_RESUME';
export const CLEAN_CURRENTRESUME = 'CLEAN_CURRENTRESUME';
export const SET_LOADING = 'SET_LOADING';
export const RESUMES_ERROR = 'RESUMES_ERROR';

// Get Resumes from localStorage
export const getResumes = () => {
  return (dispatch) => {
    return axios
      .get(`/resume/getallresumes`)
      .then((res) => {
        const resumes = res.data;
        dispatch({ type: GET_RESUMES, payload: resumes });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: RESUMES_ERROR, payload: err.response.statusText });
      });
  };
};

// Add new Resume
export const addResume = (data) => {
  return (dispatch) => {
    console.log(data)
    axios
      .post('/resume/create', data, {headers:{"Content-Type" : "application/json"}})
      .then((res) => {
        const resume = res.data;
        console.log(resume);
        successToast(`Resume ${resume.name} created !`);
        return dispatch({ type: ADD_RESUME, payload: resume });
      })
      .catch((err) => {
        console.log(err);
        const errors = err.response.data;
        errorsManager(errors);
      });
  };
};

// Delete resume from localStorage
export const deleteResume = (resumeId) => {
  return (dispatch) => {
    axios
      .delete(`resume/delete/${resumeId}`)
      .then((res) => {
        dispatch({ type: DELETE_RESUME, payload: resumeId })
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: RESUMES_ERROR, payload: err.response.statusText });
      });
  };
};

// Update resume on localStorage
export const updateResume = (resume) => {
  return (dispatch) => {
    axios
      .put(`resume/update/${resume._id}`, resume)
      .then((res) => {
        dispatch({ type: UPDATE_RESUME, payload: resume })
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: RESUMES_ERROR, payload: err.response.statusText });
      });
  };
};

// Set current resume
export const setCurrent = (id) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .get(`resume/getresume/${id}`)
      .then((res) => {
        return dispatch({ type: SET_CURRENT, payload: res.data })
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_CURRENT, payload: "NOT_FOUND" });
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };
};

export const cleanCurrentResume = () => {
  return (dispatch) => {
      return dispatch({ type: CLEAN_CURRENTRESUME, payload: {} });
  };
};


// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};