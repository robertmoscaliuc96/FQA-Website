import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'

const Navbar=({auth: {isAuthenticated, loading}, logout}) =>{
  const authLinks = (
    <ul>
      <li>
        <i className="fab fa-discourse"></i>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
      <a onClick={logout} href='#!'>
      <i className="fas fa-sign-out-alt"></i>{' '}
      <span className="hide-sm">Logout</span></a> 
      </li>
  </ul>
  );

  const guessLinks = (
    <ul>
      <li>
      <i className="far fa-plus-square"></i>
        <Link to='/register'>Sign Up</Link>
      </li>
      <li>
        <i className="fas fa-sign-in-alt"></i>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
          <i className="fas fa-code"></i> FAQ.dev
          </Link>
        </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guessLinks}</Fragment>)}
      </nav>
    )
}

Navbar.propTypes =  {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);
