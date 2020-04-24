const express = require ("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require("../../middleware/auth");

const Post = require('../../models/Post');
//const Profile = require('../../models/Profile');
const User = require('../../models/User');

const nodemailer = require("nodemailer");

// @route   POST api/posts
// @desc    Create a post
// @access  Private 
router.post("/", [auth, [
    check("text", "Text is required").not().isEmpty()
    ]
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        keyword: req.body.keyword
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route   GET api/posts
// @desc    Get all post
// @access  Private 

router.get('/', auth, async(req,res) =>{

  try {
    //  Sort by date 
    const posts = await Post.find().sort({date: -1});
    res.json(posts);


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private 

router.get('/:id', auth, async(req,res) =>{

  try {
    const post = await Post.findById(req.params.id);
    

    if (!post) {
      return res.status(404).json({msg: 'Post not found'})
    }
  res.json(post);
  } catch (err) {
    console.error(err.message);
    if(err.kind === "ObjectId"){
      return res.status(404).json({msg: 'Post not found'})
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by ID
// @access  Private 

router.delete('/:id', auth, async(req,res) =>{

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({msg: 'Post not found'});
    }

    // Check on the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'User not authorized'});
    }

    await post.remove();
    res.json({msg:"Post removed"});

  } catch (err) {
    console.error(err.message);
    if(err.kind === "ObjectId"){
      return res.status(404).json({msg: 'Post not found'});
    }
    res.status(500).send('Server Error');
  }
});



// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private 
router.put('/like/:id', auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked
    if(post.likes.filter(like => like.user.toString()=== req.user.id).length>0){
      return res.status(400).json({msg:"Post already liked"});
    }
    post.likes.unshift({user: req.user.id});

    await post.save();

    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  Private 
router.put('/unlike/:id', auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked
    if(post.likes.filter(like => like.user.toString()=== req.user.id).length === 0){
      return res.status(400).json({msg:"Post has not yet been liked"});
    }

    // Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private 
router.post("/comment/:id", [auth, [
  check("text", "Text is required").not().isEmpty()
  ]
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    
    const post = await Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id

    };
    const output = `
    <p>You have a new answer </p>
    <h3>Answer Details</h3>
    <ul>  
      <li>Name: ${user.name}</li>
      <li>Question: ${post.title}</li>
      <li>Answer: ${req.body.text}</li>
      <li>Email: ${user.email}</li>
      <li>Link: http://localhost:3000/posts/${req.params.id}</li>
      
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    let transporter = nodemailer.createTransport({
      service: 'Yahoo',
      // true for 465, false for other ports
      port: 465,
      secure: true,
      auth: {
        user: 'robertmoscaliuc96@yahoo.com', // generated ethereal user
        pass: "heebshmmwkarrxhp" // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }

    });
  
    // send mail with defined transport object
    let mailOptions = await transporter.sendMail({
      from: `"FAQ dev" <robertmoscaliuc96@yahoo.com`, // sender address
      to: "robertmoscaliuc1@gmail.com", // list of receivers
      subject: `New Answer`, // Subject line
      text: `${req.body.text}`, // plain text body
      html: output // html body
    });
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    post.comments.unshift(newComment)
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private 
router.delete('/comment/:id/:comment_id', auth, async(req,res) =>{

try {
  const post = await Post.findById(req.params.id);

  //Pull out comment
  const comment= post.comments.find(comment => comment.id === req.params.comment_id)
  // check if comment exist
  if(!comment){
    return res.status(404).json({msg: "comment doesn't exist"});
  }
  // Check user 
  if(comment.user.toString()!== req.user.id){
    return res.status(401).json({msg: "User not authorized"});
  }

// Get remove index
const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
post.comments.splice(removeIndex, 1);

await post.save();

res.json(post.comments);


} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}

});

// @route   PUT api/posts/comment/upvote:id
// @desc    Like a post
// @access  Private 
router.put('/comment/:id/:comment_id', auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been upvoted
    const comment= post.comments.find(comment => comment.id === req.params.comment_id)
    // check if comment exist
    if(!comment){
      return res.status(404).json({msg: "comment doesn't exist"});
    }
    // Check user 
    if(comment.user.toString()!== req.user.id){
      return res.status(401).json({msg: "User not authorized"});
    }
    post.upvote.unshift({user: req.user.id});

    await post.save();

    res.json(post.upvote);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;