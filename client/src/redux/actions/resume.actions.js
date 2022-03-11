export const GET_RESUMES = 'GET_RESUMES';
export const ADD_RESUME = 'ADD_RESUME';
export const DELETE_RESUME = 'DELETE_RESUME';
export const SET_CURRENT = 'SET_CURRENT';
export const UPDATE_RESUME = 'UPDATE_RESUME';
export const SET_LOADING = 'SET_LOADING';
export const RESUMES_ERROR = 'RESUMES_ERROR';

// Get Resumes from localStorage
export const getResumes = () => dispatch => {
  try {
    setLoading();
    const data = JSON.parse(localStorage.getItem("resumeBuilder"));

    dispatch({
      type: GET_RESUMES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: RESUMES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Add new Resume
export const addResume = resume => (dispatch, getState) => {
  try {
    setLoading();
    localStorage.setItem("resumeBuilder", JSON.stringify([...getState().resume.resumes, resume]));

    dispatch({
      type: ADD_RESUME,
      payload: resume
    });
  } catch (err) {
    dispatch({
      type: RESUMES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Delete resume from localStorage
export const deleteResume = id => (dispatch, getState) => {
  try {
    setLoading();
    localStorage.setItem("resumeBuilder", JSON.stringify(getState().resume.resumes.filter(resume => resume.id !== id)));

    dispatch({
      type: DELETE_RESUME,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: RESUMES_ERROR,
      payload: "ERROR_DELETE"
    });
  }
};

// Update resume on localStorage
export const updateResume = resume => (dispatch, getState) => {
  try {
    setLoading();
    localStorage.setItem("resumeBuilder", JSON.stringify(getState().resume.resumes.map(x => x.id === resume.id ? resume : x)));

    dispatch({
      type: UPDATE_RESUME,
      payload: resume
    });
  } catch (err) {
    dispatch({
      type: RESUMES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Set current resume
export const setCurrent = id => dispatch => {
  setLoading();
  let res = JSON.parse(localStorage.getItem("resumeBuilder")).find(resume => resume.id === id);

  if (!res)
    res = "NOT_FOUND"

  dispatch({
    type: SET_CURRENT,
    payload: res
  });
};


// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};