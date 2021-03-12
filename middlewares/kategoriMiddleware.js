function valid(req, res, next) {
    const kategori = req.body.name
    const kategoris = ["musik", "programming", "bahasa", "matematika", "desain", "memasak", "olahraga", "psikologi"];
    const exist = kategoris.includes(kategori);

    if(exist){
        return next()
    } else {
        return res.status(500).json({success: false, message: err.message})
    }
    
}

module.exports = valid