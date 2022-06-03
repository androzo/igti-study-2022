import OwnerRepository from "../repositories/proprietario.repository.js";
import PetRepository from "../repositories/animal.repository.js";

async function createOwner(owner) {
  return await OwnerRepository.insertOwner(owner);
}

async function getOwners() {
  return await OwnerRepository.getOwners();
}

async function getOwner(id) {
  return await OwnerRepository.getOwner(id);
}

async function deleteOwner(id) {
  const animal = PetRepository.getPetByOwnerId(id);
  if (animal) {
    throw new Error("Existem pets cadastrados para este proprietario.");
  } else {
    OwnerRepository.deleteOwner(id);
  }
}

async function updateOwner(owner) {
  return OwnerRepository.updateOwner(owner);
}

export default {
  createOwner,
  getOwners,
  getOwner,
  deleteOwner,
  updateOwner,
};
