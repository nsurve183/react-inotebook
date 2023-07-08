

const express = require('express');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewear/fetchuser');
const router = express.Router();

// secret massage for jason webtoken
let secret_msg = "Nikhilisgoodboy";


// Route 1 Create user useing 'localhost:5000/api/auth/createuser' And no login required
router.post('/createuser', [
    body('name', "Name should be min 3 character").isLength({min: 3}),
    body('email', "Enter A Valid Email").isEmail(),
    body('password', "Password should be min 6 character").isLength({min: 6}),
], async (req, res) => {
    try {
         // if there is bad request or error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    let user = await User.findOne({ email: req.body.email});
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // if user is alrady exist
    if(user){
        return res.status(400).json({errors: "Sorry User Already Exist"});
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })

    // json web token
    let data = {user:{id: user.id}}
    let authtoken = jwt.sign(data, secret_msg)
    res.json({authtoken});

    } catch (error) {
        console.error(error.massage);
        res.status(500).send('Somme Error Occured');
    }
   
})


// Route 2 user login 'localhost:5000/api/auth/login' And no login required
router.post('/login', [
    body('email', "Enter A Valid Email").isEmail(),
    body('password', "Password should be blank Or Minium 6 characters").isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        // es6 object distructering
        const {email, password} = req.body;
        
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: "Pls Enter Valid Login Credential"});   
        }

        const passwordComapre = await bcrypt.compare(password, user.password);
        if(!passwordComapre){
            return res.status(400).json({errors: "Pls Enter Valid Login Credential"});   
        }

        // jason web token
        let data = {user:{id: user.id}}
        let authtoken = jwt.sign(data, secret_msg)
        res.json({authtoken});
        
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('Internal Error Occured');
    }

})

// Route 3 get login user data 'localhost:5000/api/auth/getuser' And login required
// for get data of login user we use middlewear function
// whenever we need any procedure after login user then we have to use middlewear function
router.post('/getuser', fetchuser, async (req, res) => {
    try {
    let userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
    } catch (error) {
        console.error(error.massage);
        res.status(500).send({error: 'Internal Error Occured'}); 
    }
})
module.exports = router;