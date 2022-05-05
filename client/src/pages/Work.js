import React, { useEffect, useRef } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { setCurrent } from '../redux/actions/resume.actions';

import { Link, useParams } from 'react-router-dom';
import { getPicturePath } from '../utils/utils';

import PageTemplate from '../components/templates/PageTemplate';
import Resume from "./Resume"
import Loader from '../components/templates/resume/Loader';
import NotFound from './NotFound';

const Work = () => {
    const current = useSelector((state) => state.resumeReducer.current);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const loading = false;
    let id = useRef('');

    useEffect(() => { 
        id.current = params.id.slice(1);
        dispatch(setCurrent(id.current)); //sclicing ':'
    }, [dispatch, params.id]);


    if (loading || current === null) {
        return <Loader />;
    }

    if (current === "NOT_FOUND") {
        return <NotFound />;
    }

    return (
      <PageTemplate
        isHeaderElement={user._id !== current?.owner}
        headerElement={{
          name: "",
          link: "/profiles",
          text: "All resumes",
        }}
        pageTitle={`Resume - ${current?.name}`}>
          <div className="resume">
            <div className="resume__top">
              <img
                className="resume__top__img"
                src={getPicturePath('user', user.picture)}
                alt={`profile ${user.pseudo}`}
              />
              <div className="resume__top__wrapper">
                <h1 className="resume__top__title">@{user.pseudo}</h1>
                <span className="resume__top__info">{user.email}</span>
              </div>
            </div>
              {id.current === current._id ? (
                <Resume/>
              ) : (
                <>
                  <p>No resume has been created yet.</p>
                  <Link to="/profile/create">Create Resume</Link>
                </>
              )}
          </div>
      </PageTemplate>
    );
}

export default connect()(Work);

