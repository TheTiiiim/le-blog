const { Model, DataTypes } = require("sequelize");
const { hash } = require("bcryptjs");

const sequelize = require("../config/connection");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        tokenVersion: {
            type: DataTypes.INTEGER ,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await hash(newUserData.password, 12);
                return newUserData;
            },
            beforeUpdate: async (updateUserData) => {
                updateUserData.password = await hash(updateUserData.password, 12);
                return updateUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    },
);

module.exports = User;
