import React, { useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getResumes } from '../redux/actions/resume.actions';

import { Link } from 'react-router-dom';

import PageTemplate from '../components/templates/PageTemplate';
import Loader from '../components/templates/resume/Loader';
import Card from '../components/templates/resume/Card';
import Search from '../components/utils/Search';

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
            <div className="wrapper allboards">
                <div className="allresumes__top">
                    <h1 className="allresumes__top__title">Все резюме</h1>
                    <Search />
                </div>
                
                <div className='allresumes__container'>
                    {!loading && resumes.length === 0 ? (
                        <p className='center'>Пока что нет резюме...</p>
                    ) : (
                            resumes.map((resume) => (
                                <Link to={`/profile/view/:${resume._id}`} key={resume._id} className="allresumes__container__items">
                                    <Card { ...resume }></Card>
                                </Link>
                            )
                        )
                    )}
                </div>
            </div>
        </PageTemplate>
    );
};

export default connect()(Resumes);
