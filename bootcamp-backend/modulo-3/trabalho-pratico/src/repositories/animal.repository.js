import { connect } from "../utils/db.js";

async function insertPet(pet) {
  const conn = await connect();
  try {
    const sql =
      "INSERT INTO animais (nome, tipo, proprietario_id) values ( $1, $2, $3 ) RETURNING *";
    const values = [pet.nome, pet.tipo, pet.proprietario_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getPets() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM animais");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getPet(id) {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM animais WHERE animal_id = $1", [
      id,
    ]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updatePet(pet) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE animais " +
      "SET nome = $1, tipo = $2, proprietario_id = $3 " +
      "WHERE animal_id = $4 " +
      "RETURNING *";
    const values = [pet.nome, pet.tipo, pet.proprietario_id, pet.animal_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deletePet(id) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM animais WHERE animal_id = $1", [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getPetByOwnerId(id) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "SELECT * FROM animais WHERE proprietario_id = $1",
      [id]
    );
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertPet,
  getPets,
  getPet,
  updatePet,
  deletePet,
  getPetByOwnerId,
};
