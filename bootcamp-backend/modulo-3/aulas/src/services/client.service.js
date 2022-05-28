import ClientRepository from "../repositories/client.repository.js";
async function createClient(client) {
  return await ClientRepository.insertClient(client);
}

export default {
  createClient,
};
