import React, { useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getResumes } from '../redux/actions/resume.actions';

import { Link } from 'react-router-dom';

import PageTemplate from '../components/templates/PageTemplate';
import Loader from '../components/templates/resume/Loader';
import Card from '../components/templates/resume/Card';

const Resumes = () => {
    const resumes = useSelector((state) => state.resumeReducer.resumes);
    const dispatch = useDispatch();
    const loading = false;

    useEffect(() => {
        dispatch(getResumes());
        // eslint-disable-next-line
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    return (
        <PageTemplate pageTitle="Allresumes">
            <Link to="/profile/create" style={{ textDecoration: "none" }}>
                <Card colour={"bg-info text-light"} name={"Create Resume"}></Card>
            </Link>
            <div className='my-5 d-flex flex-wrap'>
                {!loading && resumes.length === 0 ? (
                    <p className='center'>No resumes to show...</p>
                ) : (
                    resumes.map((resume) => (<Link to={`/profile/view/:${resume._id}`} key={resume._id} style={{ textDecoration: "none" }}>
                        <Card colour={"bg-light"} name={resume.name}></Card>
                    </Link>))
                )}
            </div>
        </PageTemplate>
    );
};

export default connect()(Resumes);
