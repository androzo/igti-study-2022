import { loggers } from "winston";
import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
  try {
    let client = req.body;

    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error(
        "Os campos name, phone, email e address são obrigatórios."
      );
    }
    res.send(await ClientService.createClient(client));
    logger.info(`POST /client ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createClient,
};
