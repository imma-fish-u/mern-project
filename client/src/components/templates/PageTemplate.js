import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';

const PageTemplate = ({
    pageTitle,
    children,
    isHeaderElement = false,
    headerElement,
    hasHeader = true,
}) => {
    const isLoading = useSelector((state) => state.loaderReducer);
    document.title = `Thullo | ${isLoading ? 'Loading . . .' : pageTitle}`;

    return (
        <>
            {hasHeader && <Header isHeaderElement={isHeaderElement} headerElement={headerElement} />}

            {children}
        </>
    );
};

export default PageTemplate;
