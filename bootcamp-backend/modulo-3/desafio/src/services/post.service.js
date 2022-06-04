import PostRepository from "../repositories/post.repository.js";

async function createPost(postInfo) {
  await PostRepository.createPost(postInfo);
}

export default {
  createPost,
};
