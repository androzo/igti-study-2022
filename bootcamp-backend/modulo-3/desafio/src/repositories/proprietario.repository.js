import Owner from "../models/proprietario.model.js";

async function insertOwner(owner) {
  try {
    Owner.create(owner);
  } catch (err) {
    throw err;
  }
}

async function getOwners() {
  try {
    return await Owner.findAll();
  } catch (err) {
    throw err;
  }
}

async function getOwner(id) {
  try {
    return await Owner.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function updateOwner(owner) {
  try {
    await Owner.update(owner, {
      where: {
        proprietarioId: owner.proprietario_id,
      },
    });
    return await getOwners(owner.proprietario_id);
  } catch (err) {
    throw err;
  }
}

async function deleteOwner(id) {
  try {
    await Owner.destroy({
      where: {
        proprietarioId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertOwner,
  getOwners,
  getOwner,
  updateOwner,
  deleteOwner,
};
