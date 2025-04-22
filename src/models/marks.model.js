import sequelize from "#configs/database";
import { DataTypes } from "sequelize";
import { commonFields } from "#utils/commonField";
import Student from "#models/student";

export const Marks = sequelize.define('marks', {
     mark:{
        type:DataTypes.DOUBLE,
     },
     subject:{
        type:DataTypes.STRING,
        allowNull:true
     },
     studentId:{
      type:DataTypes.INTEGER,
      allowNull:true
     },
   ...commonFields,
},{
    tableName: 'marks',
    paranoid: true,
    underscored: true,
});

Marks.belongsTo(Student,{foreignKey:"studentId",as:"marks"});
Student.hasMany(Marks,{foreignKey:"studentId",as:"marks"})

export default Marks;
