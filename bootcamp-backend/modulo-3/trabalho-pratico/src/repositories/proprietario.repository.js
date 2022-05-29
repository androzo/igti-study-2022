import { connect } from "../utils/db.js";

async function insertOwner(owner) {
  const conn = await connect();
  try {
    const sql =
      "INSERT INTO proprietarios (nome, telefone) values ( $1, $2 ) RETURNING *";
    const values = [owner.nome, owner.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getOwners() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM proprietarios");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getOwner(id) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "SELECT * FROM proprietarios WHERE proprietario_id = $1",
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateOwner(owner) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE proprietarios " +
      "SET nome = $1, telefone = $2 " +
      "WHERE proprietario_id = $3 " +
      "RETURNING *";
    const values = [owner.nome, owner.telefone, owner.proprietario_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteOwner(id) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM proprietarios WHERE proprietario_id = $1", [
      id,
    ]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertOwner,
  getOwners,
  getOwner,
  updateOwner,
  deleteOwner,
};
