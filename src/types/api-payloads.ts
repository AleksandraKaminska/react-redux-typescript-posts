import { PostDTO } from "./post"

// Posts
export type CreatePostReq = PostDTO
export type UpdatePostReq = { id: number } & PostDTO
