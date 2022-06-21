import { useSelector } from "react-redux"

import type { State } from "../../store"
import Home from "../Home"
import Login from "../Login"

const Router = () => {
  /**
   * 登录状态
   */
  const isLoggedIn = useSelector<State, boolean>(
    (state) => state.userProfile.isLoggedIn
  )

  console.log("isLoggedIn===", isLoggedIn)

  if (!isLoggedIn) {
    return <Login />
  }

  return <Home />
}

export default Router
