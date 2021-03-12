module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("categories", {
        kategori: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, )

    category.prototype.toJSON = function () {
        var values = Object.assign({}, this.get())
        return values
    }
    return category
}