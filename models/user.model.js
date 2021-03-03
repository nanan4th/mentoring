const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
        email : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        username : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        address : {
            type: Sequelize.STRING,
            allowNull: true
        },
        profileImage : {
            type: Sequelize.STRING,
            allowNull: true
        },
        password : {
            type: Sequelize.STRING,
            allowNull: false,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, 10))
            }
        }
    }, )

    user.prototype.toJSON = function() {
        var values = Object.assign({}, this.get())

        delete values.password
        return values
    }
    return user
}