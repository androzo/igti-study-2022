import Sequelize from "sequelize";
import db from "../utils/db.js";
import Pet from "./animal.model.js";

const Servico = db.define(
  "servicos",
  {
    servicoId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Servico.belongsTo(Pet, { foreignKey: "animalId" });

export default Servico;
