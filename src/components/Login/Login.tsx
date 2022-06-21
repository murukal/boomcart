// semi
import { Button, Form, Toast, Typography } from "@douyinfe/semi-ui"
// react
import React from "react"

import type { FormValues } from "."
import { useLogin } from "../../apis/hooks/auth"
import { reinitialize } from "../../utils/app"

const { Title } = Typography

const Login = () => {
  /**
   * 用户登录hooks
   */
  const [login] = useLogin()

  /**
   * 表单提交
   */
  const onSubmit = async (values: FormValues) => {
    const res = await login({
      variables: {
        loginInput: values
      }
    }).catch((error: Error) => {
      Toast.error(error.message)
      return null
    })

    // token获取成功，初始化应用
    reinitialize(res?.data?.login)
  }

  return (
    <div
      style={{
        width: 300
      }}>
      <Title className="mb-4 text-center">登 录</Title>

      <Form onSubmit={onSubmit}>
        {/* 用户名 */}
        <Form.Input field="keyword" label="用户名/关键字" />

        {/* 密码 */}
        <Form.Input field="password" type="password" label="密码" />

        <Button theme="solid" type="primary" htmlType="submit" block>
          登 录
        </Button>
      </Form>
    </div>
  )
}

export default Login
