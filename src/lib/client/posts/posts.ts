import { CreatePostReq, UpdatePostReq, PostListRes, PostRes } from "@/types"
import { deleteRequest, getRequest, postRequest, putRequest } from "../common"

async function listPosts(query?: Record<string, any>) {
  return getRequest<PostListRes>(`/posts`, query)
}

async function retrievePost(id: number, query?: Record<string, any>) {
  return getRequest<PostRes>(`/posts/${id}`, query)
}

async function updatePost(id: number, payload: UpdatePostReq) {
  return putRequest<PostRes>(`/posts/${id}`, payload)
}

async function createPost(payload: CreatePostReq) {
  return postRequest<PostRes>(`/posts`, payload)
}

async function deletePost(id: number): Promise<number> {
  return deleteRequest(`/posts/${id}`)
}

export const posts = {
  list: listPosts,
  retrieve: retrievePost,
  update: updatePost,
  create: createPost,
  delete: deletePost,
}
