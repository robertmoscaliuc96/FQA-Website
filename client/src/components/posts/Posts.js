import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';




const Posts = ({getPosts, post:{posts, loading}}) => {
     
    const maps = (filter) =>{

        if(!filter){
            console.log(posts)
            return loading ?<Spinner/>:(
                <Fragment>
                <h1 className="large text-primary">Questions</h1>
                <p className='lead'>
                    <i className="fas fa-user"></i>Welcome to the Developer Community
                </p>
                <PostForm></PostForm>
                <div className="form-group">
                  <select name="filter" value={filter} onChange={onChange}>
                    <option>* Select a filter</option>
                    <option value="Front-end">Front-end</option>
                    <option value="Back-end">Back-end</option>
                    <option value="Databases">Databases</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Server">Server</option>
                    <option value="UIX">UIX</option>
                    <option value="All">All</option>
                  </select>
                </div>
                <div className="posts">
                    
                    {
                        posts.map(post=>(
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>
                </Fragment>
            );



        } else {
            console.log(posts.filter(post => post.keyword ===filter))
            return loading ?<Spinner/>:(
                <Fragment>
                <h1 className="large text-primary">Questions</h1>
                <p className='lead'>
                    <i className="fas fa-user"></i>Welcome to the Developer Community
                </p>
                <PostForm></PostForm>
                <div className="form-group">
                  <select name="filter" value={filter} onChange={onChange}>
                    <option>* Select a Keyword</option>
                    <option value="Front-end">Front-end</option>
                    <option value="Back-end">Back-end</option>
                    <option value="Databases">Databases</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Server">Server</option>
                    <option value="UIX">UIX</option>
                    <option value="All">Other</option>
                  </select>
                </div>
                <div className="posts">
                    
                    {
                        posts.filter(post => post.keyword ===filter).map(post=>(
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>
                </Fragment>
            );
        }

    }


    const onChange = (e) =>{
        
        console.log(`FIlter:`)
        const filter=e.target.value 
        return maps(filter)
        
    }

       useEffect(()=>{
        getPosts();
    }, [getPosts]);

 
    
    return maps(); 
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
