import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { client } from "@/lib/client"
import { PostListRes } from "@/types"

interface PostsState {
  posts: PostListRes
  isLoading: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  client.posts.list
)

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    await client.posts.delete(postId)
    return postId
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostListRes>) => {
          state.isLoading = false
          state.posts = action.payload
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? "Failed to fetch posts"
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
  },
})

export default postsSlice.reducer
