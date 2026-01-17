const jwt = require('jsonwebtoken');
require('dotenv').config();

//generating jwt
async function generateJWT(payload){ // payload is the data that is given from the controller 
    //generating jwt by sign
    let token =  await jwt.sign(payload , process.env.JWT_SECRET_KEY)
    return token
}

//verify token 
async function verifyJWT (token) {
    try {
      let data =   await jwt.verify(token ,  process.env.JWT_SECRET_KEY )   
        return data
    } catch (error) {
        return false
    }
}


//decoding the token data
async function decodeJWT(token) {
    let decoded = await jwt.decode(token)
    return decoded
}

module.exports = {generateJWT , verifyJWT  , decodeJWT}