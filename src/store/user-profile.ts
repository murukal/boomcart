// third
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import client from "../apis"
import { WHO_AM_I } from "../apis/schemas/user"
import type { User } from "../typings/user"
import { TOKEN_KEY, globalStorage } from "../utils/app"

/**
 * 用户信息
 */
export class UserProfile {
  isLoggedIn: boolean = false
  token: string = ""
  user: User = undefined
}

/**
 * 异步设置token
 */
export const setToken = createAsyncThunk("setToken", async () => {
  return (await globalStorage.get<string>(TOKEN_KEY)) || ""
})

/**
 * 获取用户信息
 */
export const getUser = createAsyncThunk("getUser", async () => {
  const res = await client.query({
    query: WHO_AM_I,
    fetchPolicy: "no-cache"
  })

  return res.data.whoAmI
})

/**
 * 用户模块
 */
const userProfileSlice = createSlice({
  name: "user-profile",
  initialState: { ...new UserProfile() },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = !!state.user
      })
  }
})

/**
 * reducer
 */
export default userProfileSlice.reducer
