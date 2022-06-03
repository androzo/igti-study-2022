import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "postgres://postgres:changeme@localhost:5432/postgres",
  {
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

export { sequelize };
