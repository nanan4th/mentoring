const jwt = require("jsonwebtoken")

function authenticationToken(req, res, next) {
    const autHeader = req.headers.authorization
    const token = autHeader && autHeader.split(' ')[1]

    if(token == null) next({
        statusCode: 401,
        message: "No token found"
    })

    jwt.verify(token, process.env.JWT_TOKEN, (err, user)=> {
        if(err){
            console.log(err)
            return next(err)
        }
        req.user = user
        next()
    })
}

module.exports  = authenticationToken
