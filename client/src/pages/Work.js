import React, { useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { setCurrent } from '../redux/actions/resume.actions';

import { useParams } from 'react-router-dom';

import Resume from "./Resume"
import Loader from '../components/templates/resume/Loader';
import NotFound from './NotFound';

const Work = () => {
    const current = useSelector((state) => state.resumeReducer.current);
    const dispatch = useDispatch();
    const params = useParams();
    const loading = false;

    useEffect(() => { 
        dispatch(setCurrent(params.id.slice(1))); //sclicing ':'
        console.log(params.id.slice(1))
    }, [dispatch, params.id]);


    if (loading || current === null) {
        return <Loader />;
    }

    if (current === "NOT_FOUND") {
        return <NotFound />;
    }

    if (params.id.slice(1) === current._id)
        return <Resume/>
    else
        return <Loader />;
}

export default connect()(Work);

