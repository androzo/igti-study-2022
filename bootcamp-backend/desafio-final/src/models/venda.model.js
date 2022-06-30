import Sequelize from "sequelize";
import db from "../utils/db.js";
import Book from "./livro.model.js";
import Customer from "./cliente.model.js";

const Venda = db.define(
  "vendas",
  {
    vendaId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Venda.belongsTo(Book, { foreignKey: "livroId" });
Venda.belongsTo(Customer, { foreignKey: "clienteId" });

export default Venda;
