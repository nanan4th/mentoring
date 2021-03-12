const um = require('../models').UsersMentors

// connection
function connection(req, res, next){
    um.create({
        userId: req.body.userId,
        mentorId: req.body.mentorId
    })
    .then( (data) => {
            res.status(200).json({success: true, data})
    })
    .catch( (err) => {
        console.log(err)
    })
}

module.exports =  {
    connection
}