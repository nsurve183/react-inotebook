

const jwt = require('jsonwebtoken');
let secret_msg = "Nikhilisgoodboy";

const fetchuser = async (req, res, next) => {
    // get the user from web token and add id req object
const token = req.header('json-token');
if(!token){
    res.status(401).send({error: 'Pls authenticate with valid token'});
}
try {
    const data = jwt.verify(token, secret_msg)
    req.user = data.user
next();    
} catch (error) {
    console.error(error.massage);
    res.status(401).send({error: 'Pls authenticate with valid token'}); 
}

}

module.exports = fetchuser;