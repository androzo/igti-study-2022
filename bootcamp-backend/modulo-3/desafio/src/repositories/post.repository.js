import { ObjectId } from "mongodb/lib/bson.js";
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

async function createComment(post) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("petstore")
      .collection("posts")
      .updateOne(
        { _id: ObjectId(post.id) },
        { $push: { comentarios: post.comments } }
      );
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getPosts() {
  const client = getClient();

  try {
    await client.connect();
    const cursor = client.db("petstore").collection("posts").find({});
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });
    return result;
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

export default {
  createPost,
  getPosts,
  createComment,
};
