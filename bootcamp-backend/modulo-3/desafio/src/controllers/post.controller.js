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

export default {
  createPost,
};
