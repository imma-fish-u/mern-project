import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Footer from '../components/templates/Footer';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Board from '../pages/Board';
import { useSelector } from 'react-redux';
import { isEmpty } from '../utils/utils';
import PrivateRoute from '../components/routes/PrivateRoute.js';
import Work from '../pages/Work';
import Resume from '../pages/Resume';
import Resumes from '../pages/Resumes';
// import BoardError from '../pages/BoardError';

const MainRouter = (props) => {
  const user = useSelector((state) => state.userReducer);
  const isLoading = useSelector((state) => state.loaderReducer);
  // const redirect = useSelector((state) => state.redirectReducer);

  return (
    <>
      <Router>
        {/* {redirect && <Redirect to={redirect} />} */}
        {!isLoading && isEmpty(user) && <Redirect to='/login' />}
        <Switch>
          <PrivateRoute exact path='/allboards' component={Home} />
          <PrivateRoute exact path='/board/:id' component={Board} />
          <PrivateRoute path='/profiles' component={Resumes} />
          <PrivateRoute path='/profile/view/:id' component={Work} />
          <PrivateRoute path='/profile/edit/:id' component={Work} />
          <PrivateRoute path='/profile/create/:id' component={Work} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          {!isEmpty(user) && document.location.pathname === '/' && (
            <Redirect to='/login' />
          )}
          <>
            <h1>Error 404</h1>
          </>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default MainRouter;
