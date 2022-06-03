import Sequelize from "sequelize";
import db from "../utils/db.js";
import Owner from "./proprietario.model.js";

const Pet = db.define(
  "animais",
  {
    animalId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

Pet.belongsTo(Owner, { foreignKey: "proprietarioId" });

export default Pet;
