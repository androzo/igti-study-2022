import Owner from "../models/proprietario.model.js";

async function insertOwner(owner) {
  try {
    return await Owner.create(owner);
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
        proprietarioId: owner.proprietarioId,
      },
    });
    return await getOwners(owner.proprietarioId);
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
