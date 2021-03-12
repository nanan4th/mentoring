module.exports = (sequelize, Sequelize) => {
    const kategori = sequelize.define("kategori", {
        name : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, )

    kategori.prototype.toJSON = function() {
        var values = Object.assign({}, this.get())
        return values
    }
    return kategori
}