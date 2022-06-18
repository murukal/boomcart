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
import { Storage } from "@plasmohq/storage"

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

/**
 * 生成persistor
 */
export const persistor = persistStore(store)

// This is what makes Redux sync properly with multiple pages
// Open your extension's options page and popup to see it in action
new Storage().watch({
  [`persist:${persistConfig.key}`]: () => {
    persistor.resync()
  }
})
