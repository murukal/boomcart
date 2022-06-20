import { Storage } from "@plasmohq/storage"

import { store } from "../store"
import { getUser, setToken } from "../store/user-profile"

/**
 * token key
 */
export const TOKEN_KEY = "CART_TOKEN"

/**
 * 生成全局的storage
 */
export const globalStorage = new Storage()

/**
 * 重新初始化应用
 */
export const reinitialize = async (token: string) => {
  if (!token) return
  // 在应用缓存中存储token
  await globalStorage.set(TOKEN_KEY, token)

  console.log(
    "await storage.get(TOKEN_KEY)===",
    await globalStorage.get(TOKEN_KEY)
  )

  const dispatch = store.dispatch

  // 在redux中存储token
  await dispatch(setToken())
  // 获取用户信息
  await dispatch(getUser())
}
