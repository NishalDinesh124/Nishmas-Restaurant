const Users = require('../Models/userModel');
const bcrypt = require('bcrypt');

module.exports.login = async (req,res, next)=>{
    try{       
        const {email, password } = req.body;
        const user =await Users.findOne({email});
        if(!user)
        return res.send({msg: "Invalid username or password", status:false});
        const isPasswordValid =await bcrypt.compare(password, user.password)
        if(!isPasswordValid)
        return res.json({status:false});
        delete user.password
        return res.json({status:true,user})
    }catch(err){
        next(err)
    }
}

module.exports.register = async (req,res, next)=>{
    try{    
        console.log("Register running");
        
        const {username, email, password } = req.body;
        const usernameCheck =await Users.findOne({username});
        if(usernameCheck)
        return res.json({msg: "Username already exist", status:false});
        const emailCheck =await Users.findOne({email});
        if(emailCheck)
        return res.json({msg: "Email already exist", status:false});
        const hashedPassword =await bcrypt.hash(password,10);
        const user = await Users.create({
            email,
            username,
            password:hashedPassword
        });
        delete user.password;
        return res.json({status: true, user})
    }catch(err){
        next(err)
    }
}