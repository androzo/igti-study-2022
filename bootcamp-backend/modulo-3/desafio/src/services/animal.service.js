import PetRepository from "../repositories/animal.repository.js";
import OwnerRepository from "../repositories/proprietario.repository.js";

async function createPet(pet) {
  if (await OwnerRepository.getOwner(pet.proprietarioId)) {
    return await PetRepository.insertPet(pet);
  }
  throw new Error("Proprietario inexistente na base");
}

async function getPets(ownerId) {
  if (ownerId) {
    return await PetRepository.getPetByOwnerId(ownerId);
  } else {
    return await PetRepository.getPets();
  }
}

async function getPet(id) {
  return await PetRepository.getPet(id);
}

async function deletePet(id) {
  PetRepository.deletePet(id);
}

async function updatePet(pet) {
  if (await OwnerRepository.getOwner(pet.proprietarioId)) {
    return PetRepository.updatePet(pet);
  }
  throw new Error("Proprietario inexistente na base");
}

export default {
  createPet,
  getPets,
  getPet,
  deletePet,
  updatePet,
};
