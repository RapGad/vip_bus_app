const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')





const signUp = async(req,res)=>{

    try {
        const {name,phone,password} = req.body
         
        if(!name || !phone || !password ) return res.status(400).json({success: false, message: "All fields are required"})
        
        const findPhone = await User.findOne({phone})

        if(findPhone) return res.status(400).json({success: false, message: "Phone number is already registered"})
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,phone,password: hashPassword
        })
        await newUser.save()


        return res.status(200).json({success: true, message: "Registration successfull"})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Registration error"})
        
    }
}


const login = async(req,res)=>{
    try {
        const {phone, password } = req.body

        if(!phone || !password) return res.status(400).json({success: false, message: "All fields are required "})

        const findPhone = await User.findOne({phone})
        
        if(!findPhone) return res.status(404).json({success: false, message: "Phone number not found"})

        const passwordCompare = await bcrypt.compare(password, findPhone.password)

        if(!passwordCompare) return res.status(400).json({message: "invalid password"})

        const token = jwt.sign({id: findPhone._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie('token', token,{
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({success: true, message: "Login succesfull"})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Login error"})

        
    }
}


module.exports = {signUp, login}