import React, { useEffect } from 'react';
import Router from './router/index';
import PageLoader from './components/templates/PageLoader';
import { useSelector } from 'react-redux';
import ToastManager from './components/templates/ToastManager';
import SocketManager from './socket/socketManager';
import ModalManager from './components/templates/modal/ModalManager';
import dummy from './components/data/dummy.json'

const App = (props) => {
    const isLoading = useSelector((state) => state.loaderReducer);

    useEffect(() => {
        localStorage.setItem("resumeBuilder", JSON.stringify(dummy));
      }, []);

    useEffect(() => {
        isLoading
            ? (document.querySelector('html').style = 'overflow : hidden')
            : (document.querySelector('html').style = 'overflow : visible');
    }, [isLoading]);

    return (
        <div className="app">
            {isLoading && <PageLoader />}
            <ModalManager />
            <SocketManager />
            <ToastManager />
            <Router />
        </div>
    );
};

export default App;
