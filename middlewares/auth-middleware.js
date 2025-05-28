const jwt = require('jsonwebtoken')



const authMiddleware = async(req,res,next)=>{
    try {

        const token = req.cookies.token

        if(!token) return res.status(401).json({message: "Unauthorized access"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Middleware error"})
        
    }
}


module.exports = authMiddleware