import sequelize from "#configs/database";
import { DataTypes } from "sequelize";
import { commonFields } from "#utils/commonField";

export const Student = sequelize.define(
  "students",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    ...commonFields,
  },
  {
    tableName: "students",
    paranoid: true,
    underscored: true,
  }
);


export default Student;
// console.log(await User.sync({alter: true}))
