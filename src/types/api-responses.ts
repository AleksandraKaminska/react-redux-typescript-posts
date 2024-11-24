import { PostDTO } from "./post"

// Posts
export type PostRes = { id: number } & PostDTO
export type PostListRes = PostRes[]
