import PetService from "../services/animal.service.js";

async function createPet(req, res, next) {
  try {
    let pet = req.body;

    if (!pet.nome || !pet.tipo || !pet.proprietario_id) {
      throw new Error(
        "Os campos nome, tipo e proprietario_id são obrigatórios."
      );
    }
    pet = await PetService.createPet(pet);
    res.send(pet);
    logger.info(`POST /animal ${JSON.stringify(pet)}`);
  } catch (err) {
    next(err);
  }
}

async function getPets(req, res, next) {
  try {
    res.send(await PetService.getPets(req.query.proprietario_id));
    logger.info(`GET /animal`);
  } catch (err) {
    next(err);
  }
}

async function getPet(req, res, next) {
  try {
    res.send(await PetService.getPet(req.params.id));
    logger.info(`GET /animal/:id`);
  } catch (err) {
    next(err);
  }
}

async function deletePet(req, res, next) {
  try {
    await PetService.deletePet(req.params.id);
    res.end();
    logger.info(`DELETE /animal/:id`);
  } catch (err) {
    next(err);
  }
}

async function updatePet(req, res, next) {
  try {
    let pet = req.body;
    if (!pet.animal_id || !pet.nome || !pet.tipo || !pet.proprietario_id) {
      throw new Error(
        "Os campos animal_id, nome, tipo e proprietario_id são obrigatórios."
      );
    }

    pet = await PetService.updatePet(pet);
    res.send(pet);
    logger.info(`PUT /animal ${JSON.stringify(pet)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createPet,
  getPets,
  getPet,
  deletePet,
  updatePet,
};
