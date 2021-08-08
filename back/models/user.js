const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: DataTypes.STRING(40),
                allowNull: true,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(17),
                allowNull: true,
            },
            nick: {
                type: DataTypes.STRING(17),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'User',
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    // static associate(db) {
    //     db.User.hasMany(db.Who);
    // }
};