import { Storage } from "@plasmohq/storage"

import { store } from "../store"
import { getUser, setToken } from "../store/user-profile"

/**
 * token key
 */
export const TOKEN_KEY = "CART_TOKEN"

/**
 * 服务列表
 */
export enum AppID {
  Boomemory = "boomemory",
  Boomart = "boomart"
}

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

  const dispatch = store.dispatch

  // 在redux中存储token
  await dispatch(setToken())
  // 获取用户信息
  await dispatch(getUser())
}
