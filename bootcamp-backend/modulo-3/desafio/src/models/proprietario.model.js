import Sequelize from "sequelize";
import db from "../utils/db.js";

const Proprietario = db.define(
  "proprietarios",
  {
    proprietarioId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

export default Proprietario;
