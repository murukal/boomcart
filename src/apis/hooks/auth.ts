import { useMutation } from "@apollo/client"

import { LOGIN } from "../schemas/auth"

/**
 * 用户登录
 */
export const useLogin = () => useMutation(LOGIN)
