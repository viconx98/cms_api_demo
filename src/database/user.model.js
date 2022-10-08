import sequelize from "./db_config.js"
import { DataTypes } from "sequelize"

// Create user table
export const userModel = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // TODO: More fields for will go here
})

// await userModel.sync({force: true})
export default userModel