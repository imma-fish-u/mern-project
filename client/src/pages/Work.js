import React, { useState, useEffect, useRef } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { cleanCurrentResume, setCurrent } from '../redux/actions/resume.actions';

import { useLocation } from 'react-router-dom';
import PageTemplate from '../components/templates/PageTemplate';
import Resume from "./Resume"

const Work = () => {
    const current = useSelector((state) => state.resumeReducer.current);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [mode, setMode] = useState("");

    let location = useLocation();
    const url_split = useRef(null);

    useEffect(() => { 
      url_split.current = location.pathname.split('/');
      setMode(url_split.current[2]);
      dispatch(setCurrent(url_split.current[3].slice(1))); //sclicing ':'
      return () => {
        dispatch(cleanCurrentResume());
      }
    }, [dispatch, location]);


    return (
      <PageTemplate
        isHeaderElement= {user._id !== current?.owner}
        headerElement= {{
          name: "",
          link: "/profiles",
          text: "Все резюме",
        }}
        pageTitle={`Resume - ${current?.name}`}>
          {current && 
            <Resume 
              mode={mode} 
              id={url_split.current[3].slice(1)}
              isMineResume = {user._id === current?.owner}
              />
          }
      </PageTemplate>
    );
}

export default connect()(Work);

