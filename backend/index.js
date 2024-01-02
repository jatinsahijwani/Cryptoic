const express =require('express');
const app = express();
const port = 5050;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const secret = '6969420';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://rudrakshkumrawat110:Qfmgg7hyjm@cluster0.rxlacmh.mongodb.net/');

const userSchema = new mongoose.Schema({
    gmail: String,
    username: String,
    password: String
});

const User = mongoose.model('Users',userSchema);

let verify = (req,res,next) => {
    try
    {
    let auth = req.headers.authorization;
    if(!auth)
    { 
        return res.json({message: 'Invalid authorization'});
    }
    let token = auth.replace("Bearer ",'');
    let user = jwt.verify(token,secret);
    req.user = user;
    next();
    }catch(error)
    {
        return res.json({message: 'Invalid token',error: error.message});    
    }
}


app.get('/',(req,res)=> {
    return res.json({message: 'hehehehe'});
})

app.post('/register',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const gmail = req.body.gmail;
    let json = {username: username, password:password, gmail:gmail};
    let existingUser = await User.findOne({username:username});
    if(existingUser)
    {
        return res.json({message: 'already Registered'});
    }
    existingUser= await User.findOne({gmail:gmail});
    if(existingUser)
    {
        return res.json({message: 'email id already exists'});
    }
    let newUser = new User(json);
    await newUser.save();
    let token = jwt.sign(json,secret);
    return res.json({token: token});
})

app.post('/login',async(req,res)=> {
    let username = req.body.username;
    let password = req.body.password;
    let existignUser = await User.findOne({ username: username});
    if(!existignUser)
    {
        return res.json({message: 'User does not exist'});
    }
    if(existignUser.password == password) {
        let json = {
            username: existignUser.username,
            password: existignUser.password,
            gmail: existignUser.gmail
        };
        let token  = jwt.sign(json,secret);
        return res.json({token: token});
    }
    else
    {
        return res.json({message: 'Incorrect password'});
    }
});

app.listen(port,()=> {
    console.log('listening on port '+port);
})