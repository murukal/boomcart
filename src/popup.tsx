import { ApolloProvider } from "@apollo/client"
import "@fontsource/inter"
import "@fontsource/inter/500.css"
import "@fontsource/inter/700.css"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import client from "./apis"
import Router from "./components/Router/Router"
import { persistor, store } from "./store"
import "./style.css"

const Popup = () => {
  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <div
            style={{
              padding: "20px"
            }}>
            <Router />
          </div>
        </PersistGate>
      </ApolloProvider>
    </StoreProvider>
  )
}

export default Popup
