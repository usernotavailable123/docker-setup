const express = require('express');
const User = require('../models/User');
var brcypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchusers = require('../middleware/fetchuser');
const router = express.Router();
const {body,validationResult} = require("express-validator");
const JWT_SECRET='welcometosecretsociety';

//create user
router.post('/createuser',
[
    body("name","Enter a valid name").isLength({min:3}),
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be atleast of length 5").isLength({min:5})
]
,async (req,res) =>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"User with the email already exitst!!!"});
        }
        var salt = await brcypt.genSaltSync(10);

        var secPass = await brcypt.hash(req.body.password,salt);
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const data = {
            user:{
                id:user.id
            }
        };
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken});
    }catch(e){
        console.log(e.message);
    }
})

//login 
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password annot be blank').exists()
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'Please try to login with correct credentials'});
        }
        const passwordCompare = await brcypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:'Please check your credentials'});
        }
        const data = {
            user:{
                id:user.id
            }
        };
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken});
    }catch(error){
        console.log(error.message);
        res.status(500).send('Internal Server Error here');
    }
})

//getuser
router.post('/getuser',fetchusers,async (req,res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select('password');
        res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;