import PostService from "../services/post.service.js";

async function createPost(req, res, next) {
  try {
    let post = req.body;
    await PostService.createPost(post);
    res.end();
    logger.info(`POST /posts ${JSON.stringify(post)}`);
  } catch (err) {
    throw err;
  }
}

async function getPosts(req, res, next) {
  try {
    const posts = await PostService.getPosts();
    res.send(posts);
    logger.info("GET /posts");
  } catch (err) {
    throw err;
  }
}

async function createComment(req, res, next) {
  try {
    const post = req.body;

    if (!post.id || !post.comments) {
      throw new Error("Os campos id e comments são obrigatórios");
    }

    const result = await PostService.createComment(post);
    res.send(result);
    logger.info("POST /posts/comment");
  } catch (err) {
    throw err;
  }
}

export default {
  createPost,
  getPosts,
  createComment,
};
