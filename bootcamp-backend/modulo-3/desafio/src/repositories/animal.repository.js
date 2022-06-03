import Pet from "../models/animal.model.js";

async function insertPet(pet) {
  try {
    return await Pet.create(pet);
  } catch (err) {
    throw err;
  }
}

async function getPets() {
  try {
    return await Pet.findAll();
  } catch (err) {
    throw err;
  }
}

async function getPet(id) {
  try {
    return await Pet.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function updatePet(pet) {
  try {
    await Pet.update(pet, {
      where: {
        animalId: pet.animalId,
      },
    });
    return await getPet(pet.animalId);
  } catch (err) {
    throw err;
  }
}

async function deletePet(id) {
  try {
    await Pet.destroy({
      where: {
        animalId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getPetByOwnerId(id) {
  try {
    return await Pet.findAll({
      where: {
        proprietarioId: id,
      },
    });
  } catch (err) {
    throw err;
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
