import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
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

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.posts.list()
  return response
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? "Failed to fetch posts"
      })
  },
})

export default postsSlice.reducer
