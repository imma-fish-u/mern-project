import React from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import { Link } from 'react-router-dom';

const Error = ({ title, text, link }) => {
    return (
        <PageTemplate pageTitle={title}>
            <h1>{text}</h1>
            <Link to={link}>Вернуться к главной</Link>
        </PageTemplate>
    );
};

export default Error;
