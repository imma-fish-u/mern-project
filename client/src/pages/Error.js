import React from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import { Link } from 'react-router-dom';

const Error = ({ title, text, link }) => {
    return (
        <PageTemplate pageTitle={title}>
            <h1>{text}</h1>
            <Link to={link}>Back to home</Link>
        </PageTemplate>
    );
};

export default Error;
