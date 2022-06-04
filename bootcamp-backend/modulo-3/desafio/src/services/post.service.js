import PostRepository from "../repositories/post.repository.js";

async function createPost(postInfo) {
  await PostRepository.createPost(postInfo);
}

async function getPosts() {
  return await PostRepository.getPosts();
}

async function createComment(post) {
  return await PostRepository.createComment(post);
}

export default {
  createPost,
  getPosts,
  createComment,
};
