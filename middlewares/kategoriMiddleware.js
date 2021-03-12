function valid(req, res, next) {
    const kategori = req.body.name
    const kategoris = ["programming", "bahasa", "matematika", "desain", "musik"];
    const exist = kategoris.includes(kategori);

    if(exist){
        return next()
    } else {
        return res.status(500).json({success: false, message: err.message})
    }
    
}

module.exports = valid