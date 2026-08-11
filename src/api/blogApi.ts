import api from "./axios";
export type BlogPost = { _id: string; id: string; title: string; slug: string; excerpt: string; content: string; image: string; published: boolean; author: { _id?: string; id?: string; name: string; email: string }; createdAt: string; updatedAt: string };
export const getBlogs = (page = 1) => api.get<{ blogs: BlogPost[]; pagination: { page: number; pages: number; total: number } }>(`/blogs?page=${page}`).then((response) => response.data);
export const getBlog = (slug: string) => api.get<{ blog: BlogPost }>(`/blogs/${encodeURIComponent(slug)}`).then((response) => response.data.blog);
export const getMyBlogs = () => api.get<{ blogs: BlogPost[] }>("/blogs/mine").then((response) => response.data.blogs);
export const createBlog = (body: FormData) => api.post<{ blog: BlogPost }>("/blogs", body).then((response) => response.data.blog);
export const updateBlog = (id: string, body: FormData) => api.patch<{ blog: BlogPost }>(`/blogs/${id}`, body).then((response) => response.data.blog);
export const deleteBlog = (id: string) => api.delete(`/blogs/${id}`);
export const blogAssetUrl = (image: string) => image?.startsWith("/") ? `${String(api.defaults.baseURL || "").replace(/\/api\/?$/, "")}${image}` : image;
