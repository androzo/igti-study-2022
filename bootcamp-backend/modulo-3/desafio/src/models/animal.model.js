import Sequelize from "sequelize";
import sequelize from "../utils/db.js";
import Owner from "./proprietario.model.js";

const Pet = sequelize.define(
  "animais",
  {
    animalId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

Pet.belongsTo(Owner, { foreignKey: "proprietarioId" });

export default Pet;
