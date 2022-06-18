// third
import { createSlice } from "@reduxjs/toolkit"

/**
 * 用户信息
 */
export class UserProfile {
  isLoggedIn: boolean = false
  token: string = ""
}

/**
 * 用户模块
 */
const userProfileSlice = createSlice({
  name: "user-profile",
  initialState: { ...new UserProfile() },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    }
  }
})

/**
 * actions
 */
export const { login } = userProfileSlice.actions

/**
 * reducer
 */
export default userProfileSlice.reducer
