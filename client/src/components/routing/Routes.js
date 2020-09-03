import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import PrivateRoute from './PrivateRoute'
import NotFound from '../layout/NotFound';

const Routes = () => {

    return (
        <section className='container'>
            <Alert/>
            <Switch>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <PrivateRoute exact path='/posts' component={Posts}/>        
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )

};
export default Routes;