import pg from "pg";

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  try {
    const pool = new pg.Pool({
      connectionString: "postgres://postgres:changeme@localhost:5432/postgres",
    });
    global.connection = pool;
    return pool.connect();
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
}

export { connect };
