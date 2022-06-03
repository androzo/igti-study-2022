import Sequelize from "sequelize";

const connection = "postgres://postgres:changeme@localhost:5432/postgres";

const sequelize = new Sequelize(connection, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export { sequelize };
