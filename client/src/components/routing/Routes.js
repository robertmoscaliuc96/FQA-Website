import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Posts from '../posts/Posts';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {

    return (
        <section className='container'>
            <Aler/>
            <Switch>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Register}/>
                <PrivateRoute exact path='/posts' component={Posts}/>

            </Switch>
        </section>
    )

};
export default Routes