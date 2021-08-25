const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Like extends Model {
    static init(sequelize) {
        return super.init({
            land: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            chungYak: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            landName: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            landArea: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            landPrice:{
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            landType: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            landSpecial: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            show: {
                type: DataTypes.STRING(5),
                allowNull: true,
                default: 0,
            }
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