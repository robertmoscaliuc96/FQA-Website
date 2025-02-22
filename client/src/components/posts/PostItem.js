import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {addLike, removeLike,deletePost } from '../../actions/post';

const PostItem = ({ auth,addLike,removeLike,deletePost,showActions, post: {_id,title,text, name, avatar,user, likes, comments,date}}) => (
        <div className="post bg-white p-1 my-1">
          <div>
            
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            
          </div>
          <div>
          
            <h4 className="my-1">{title}</h4>
            <p className="my-1">
            {text}
            </p>
             <p className="post-date">
             Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && (
              <Fragment>
            <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button onClick={()=>removeLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
             {comments.length > 0 ? (
                <span className='comment-count'>Answers{' '}{comments.length}</span> ): (<span className='comment-count'>Unanswered</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
            <button onClick ={() => deletePost(_id)} type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
            </button>
            )}
          
          </Fragment>
            )}
            
          </div>
        </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
     auth: state.auth
});
    
export default connect(mapStateToProps, {addLike, removeLike,deletePost})(PostItem);
