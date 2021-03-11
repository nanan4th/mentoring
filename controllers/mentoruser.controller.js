const um = require('../models').UsersMentors

// payment
function payment(req, res, next){
    um.create({
        userId: req.body.userId,
        mentorId: req.body.mentorId
    })
    .then( (data) => {
        um.findOne(
            {include: [{
                model: mentor,
                require: true,
                attributes: [rate],
                where: {id: data.mentorId}
            }]})
            .then( (hasil) => {
                res.status(200).json(hasil)
            })
            .catch( (err) => {
                console.log(err)
            })
    })
    .catch( (err) => {
        console.log(err)
    })
}

module.exports =  {
    payment
}