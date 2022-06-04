import { getClient } from "../utils/mongo.js";

async function createPost(postInfo) {
  const client = getClient();

  try {
    await client.connect();
    await client.db("petstore").collection("posts").insertOne(postInfo);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

export default {
  createPost,
};
