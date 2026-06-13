import api from "../api/axios";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

// Slug-based lookup — matches GET /posts/slug/{slug}
export const getPost = async (slug) => {
  const response = await api.get(`/posts/slug/${slug}`);
  return response.data;
};

export const getFeaturedPost = async () => {
  const response = await api.get("/posts/featured");
  return response.data;
};

// ── Admin-only endpoints ──

export const getAllPostsAdmin = async () => {
  const response = await api.get("/posts/admin/all");
  return response.data;
};

export const createPost = async (data) => {
  const response = await api.post("/posts", data);
  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await api.put(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};

export const publishPost = async (id) => {
  const response = await api.patch(`/posts/${id}/publish`);
  return response.data;
};

export const unpublishPost = async (id) => {
  const response = await api.patch(`/posts/${id}/unpublish`);
  return response.data;
};
