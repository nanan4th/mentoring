function errorHandler(err, req, res, _next){
    console.log(err)

    switch(true){
        case typeof err === "string" :
            {
                const is404 = err.toLowerCase().endsWith('not found')
                const statusCode = is404 ? 404 : 400
                return res.status(statusCode).json({success: false, message: err})
            }
            
        case (typeof err === 'object' && err.statusCode != null):
            {
                return res.status(err.statusCode).json({success: false, message: err.message})
            }

        default:
            {
                return res.status(500).json({success: false, message: err.message})
            }
    }
}

module.exports = errorHandler
