const { verifyToken } = require("../utils/generateToken")

const verifyUser = async (req,res,next) => {
    //taking token from header 
    let token = req.headers.authorization.split(" ")[1]
    // if token is not present
    if(!token){
        return res.status(400).json({
            success : false,
            message : "Please sign in"
        })
    }

    // if token is present then verify it that it is from out generated part or not and then take the data from that
    try {
        let user = await verifyToken(token)
        // if the user or token is wrong then
        if(!user){
            return res.status(400).json({
            success : false,
            message : "Please sign in"
        })
        }
        // passing the id in req for next function which is createblog and it will be stored in creator
        req.user = user.id
        next() // we use next in middleware to move to the next function
    } catch (error) {
        
    }
}

module.exports = verifyUser