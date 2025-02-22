const express = require ("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require ("bcryptjs");
const config = require("config");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");


const User = require("../../models/User");


// @route   Post api/users
// @desc    Test route
// @access  Public 
router.post("/",[
    check("name","Name is required").not().isEmpty(),
    check ("email", "Pleas include a valid email").isEmail(),
    check ("password", "Please enter a password with 6 or more characters").isLength({min:6 })
], async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email,password}= req.body;

    try {

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg:"User already exists"}] });
        }

    // Get users avatar
        const avatar= gravatar.url((email, {
            s: "200",
            r: "pg",
            d: "mm"
        }))
        // create user
        user = new User({
            name,
            email,
            avatar,
            password,
        });
        
    // Encrypt password (hash)

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

    // save user in DB    
        await user.save();

    // Return jsonwebtoken
        const payload = {
            user:{
                id: user.id
            }
        };
        jwt.sign(payload, config.get("jwtToken"),{expiresIn: 360000}, 
        (err, token) =>{
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).sent("Server error");
    };


    
    console.log(req.body);
    



});


module.exports = router;