const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            name: {
                type: Sequeliuze.STRING(17),
                allowNull: true,
            },
            nick: {
                type: Sequelize.STRING(17),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    // static associate(db) {
    //     db.User.hasMany(db.Who);
    // }
};