// third
import {
  CombinedState,
  combineReducers,
  configureStore
} from "@reduxjs/toolkit"
import type { PersistConfig } from "redux-persist"
import storage from "redux-persist/lib/storage"

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  RESYNC,
  persistReducer,
  persistStore
} from "@plasmohq/redux-persist"

// project
import userProfile, { UserProfile } from "./user-profile"

/**
 * 联合reducer
 */
const reducer = combineReducers({
  userProfile
})

export type State = CombinedState<{ userProfile: UserProfile }>

/**
 * persist配置
 */
const persistConfig: PersistConfig<State> = {
  key: "root",
  storage
}

/**
 * 序列化reducer
 */
const persistedReducer = persistReducer(persistConfig as any, reducer)

/**
 * 生成store
 */
export const store = configureStore<State>({
  reducer: persistedReducer
})

/**
 * 生成persistor
 */
export const persistor = persistStore(store)
