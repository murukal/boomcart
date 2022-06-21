import {
  CombinedState,
  combineReducers,
  configureStore
} from "@reduxjs/toolkit"
import { localStorage } from "redux-persist-webextension-storage"

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

import { globalStorage } from "../utils/app"
import userProfile, { UserProfile } from "./user-profile"

/**
 * State ts声明
 */
export type State = CombinedState<{ userProfile: UserProfile }>

/**
 * 合并reducer
 */
const rootReducer = combineReducers({
  userProfile
})

/**
 * persist配置
 */
const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage
}

/**
 * 生成reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * 生成store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          RESYNC
        ]
      }
    })
})

export const persistor = persistStore(store)

// This is what makes Redux sync properly with multiple pages
// Open your extension's options page and popup to see it in action
globalStorage.watch({
  [`persist:${persistConfig.key}`]: () => {
    persistor.resync()
  }
})
