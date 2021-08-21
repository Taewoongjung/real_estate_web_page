const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Like extends Model {
    static init(sequelize) {
        return super.init({
            land: {
                type: DataTypes.STRING(40),
                allowNull: true,
                unique: true,
            },
            chungYak: {
                type: DataTypes.STRING(40),
                allowNull: true,
                unique: true,
            },
        },{
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Like',
            tableName: 'likes',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Like.belongsTo(db.User);
    }
};