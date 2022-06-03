import ServicoRepository from "../repositories/servico.repository.js";
import PetRepository from "../repositories/animal.repository.js";

async function createServico(servico) {
  if (await PetRepository.getPet(servico.animalId)) {
    return await ServicoRepository.insertServico(servico);
  }
  throw new Error("Proprietário inexistente na base");
}

async function getServicos(ownerId) {
  if (ownerId) {
    return await ServicoRepository.getServicoByOwnerId(ownerId);
  } else {
    return await ServicoRepository.getServicos();
  }
}

async function getServico(id) {
  return await ServicoRepository.getServico(id);
}

async function deleteServico(id) {
  ServicoRepository.deleteServico(id);
}

async function updateServico(servico) {
  if (await PetRepository.getPet(servico.animalId)) {
    return ServicoRepository.updateServico(servico);
  }
  throw new Error("Proprietário inexistente na base");
}

export default {
  createServico,
  getServicos,
  getServico,
  deleteServico,
  updateServico,
};
