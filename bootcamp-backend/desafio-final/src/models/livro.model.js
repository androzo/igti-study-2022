import Sequelize from "sequelize";
import db from "../utils/db.js";
import Author from "./autor.model.js";

const Book = db.define(
  "livros",
  {
    livroId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    estoque: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  { underscored: true }
);

Livro.belongsTo(Author, { foreignKey: "authorId" });

export default Book;
