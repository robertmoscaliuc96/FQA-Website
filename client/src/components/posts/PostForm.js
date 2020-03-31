import React, {useState }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addPost} from '../../actions/post';


const PostForm = ({addPost}) => {

    const[formData, setFormData] = useState({
      title: "",
      text: "",
    });

    const {title,text} = formData;
    //const [title,text,setText] = useState('')
    const onChange= e => setFormData({...formData, [e.target.name]:e.target.value}); 

    return (
        <div className='post-form'>
        <div className='bg-primary p'>
          <h2>Say Something...</h2>
        </div>
        
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            addPost({ title, text });
            
          }}
        >          
        <div className="form-group">
          <input type='text' placeholder='Title' onChange={e =>onChange(e)} value={title} name= "title" />
        </div>

          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a summary'
            value={text}
            onChange={e =>onChange(e)}
            required
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    )
}
PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null,{addPost})(PostForm)
