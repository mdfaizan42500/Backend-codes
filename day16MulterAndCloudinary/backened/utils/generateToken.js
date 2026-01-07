const jwt = require('jsonwebtoken');

//generating jwt
async function generateJWT(payload){ // payload is the data that is given from the controller 
    //generating jwt by sign
    let token =  await jwt.sign(payload , "secretKey")
    return token
}

//verify token 
async function verifyToken(token) {
    try {
      let data =   await jwt.verify(token , "secretKey" )   
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

module.exports = {generateJWT , verifyToken , decodeJWT}