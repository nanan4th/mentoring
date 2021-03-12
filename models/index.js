const {Sequelize, DataTypes} = require('sequelize')
const { mentor } = require('../validators')
const env = process.env

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    operatorsAliases: false,

    pool: {
        max: 3,
        min: 0,
        idle: 3000,
        acquire: 10000
    }
})

const users = require('./user.model')(sequelize,Sequelize)
const mentors = require('./mentor.model')(sequelize,Sequelize)
const kategori = require('./kategori.model')(sequelize,Sequelize)

kategori.hasMany(mentors)
mentors.belongsTo(kategori)

const UsersMentors = sequelize.define('UsersMentors', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: users,
            key: 'id'
     }
    },
    mentorId: {
        type: DataTypes.INTEGER,
        references: {
            model: mentors,
            key: 'id'
     }
    } 
});
users.belongsToMany(mentors, {through: UsersMentors})
mentors.belongsToMany(users, {through: UsersMentors})

module.exports= {
    Sequelize,
    sequelize,
    users,
    mentors,
    kategori,
    UsersMentors
}