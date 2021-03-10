const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const mentor = sequelize.define("mentors", {
        email : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        occupation : {
            type: Sequelize.STRING,
            allowNull: false
        },
        category : {
            type: Sequelize.STRING,
            allowNull: false
        },
        address : {
            type: Sequelize.STRING,
            allowNull: false
        },
        method : {
            type: Sequelize.STRING,
            allowNull: false,
            where: {
                method: ["Tatap muka", "Online"]
            }
        },
        about : {
            type: Sequelize.STRING,
            allowNull: false
        },
        rate : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        profileImage : {
            type: Sequelize.STRING,
            allowNull: false
        },
        cvImage : {
            type: Sequelize.STRING,
            allowNull: false
        },
        money: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        password : {
            type: Sequelize.STRING,
            allowNull: false,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, 10))
            }
        }
    }, )

    mentor.prototype.toJSON = function() {
        var values = Object.assign({}, this.get())

        delete values.password
        return values
    }
    return mentor
}