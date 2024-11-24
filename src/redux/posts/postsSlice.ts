import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { client } from "@/lib/client"
import { PostListRes, PostRes } from "@/types"
import { PostDTO } from "@/types/post"

interface PostsState {
  posts: PostListRes
  isLoading: boolean
  isPending: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isPending: false,
  error: null,
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  client.posts.list
)

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data: PostDTO) => {
    return await client.posts.create(data)
  }
)

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data: PostRes) => {
    await client.posts.update(data.id, data)
    return data
  }
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
        state.isPending = false
        state.error = null
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostListRes>) => {
          state.isLoading = false
          state.isPending = false
          state.posts = action.payload
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isPending = false
        state.error = action.error.message ?? "Failed to fetch posts"
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = false
        state.isPending = true
        state.error = null
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<PostRes>) => {
          state.isLoading = false
          state.isPending = false
          state.posts = [action.payload, ...state.posts]
        }
      )
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isPending = false
        state.error = action.error.message ?? "Failed to create the post"
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = false
        state.isPending = true
        state.error = null
      })
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<PostRes>) => {
          state.isLoading = false
          state.isPending = false

          const index = state.posts.findIndex(
            (post) => post.id === action.payload.id
          )
          if (index !== -1) {
            state.posts[index] = action.payload
          }
        }
      )
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isPending = false
        state.error = action.error.message ?? "Failed to update the post"
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
  },
})

export default postsSlice.reducer
