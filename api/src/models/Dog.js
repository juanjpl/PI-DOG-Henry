const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type : DataTypes.STRING,
      allowNull:false,


    },
    weight:{
      type: DataTypes.STRING,
      allowNull:false,

    },
    life_span : {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: "Unknown"
    },
    image_url:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: "https://www.jamiesale-cartoonist.com/wp-content/uploads/dog-12.png"

    },
    description:{
      type:DataTypes.TEXT,
      allowNull: true
    },
    createDB:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  },{
    timestamps: false });
};
