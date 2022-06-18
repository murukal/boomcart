// semi
import { Button, Form, Typography } from "@douyinfe/semi-ui"
// react
import React from "react"

import type { FormValues } from "."
import { useLogin } from "../../apis/hooks/auth"

const { Title } = Typography

const Login = () => {
  /**
   * 用户登录hooks
   */
  const [login, { data }] = useLogin()

  /**
   * 表单提交
   */
  const onSubmit = async (values: FormValues) => {
    await login({
      variables: {
        loginInput: values
      }
    })

    console.log("data====", data)
  }

  return (
    <>
      <Title className="mb-4 text-center">登 录</Title>

      <Form onValueChange={(values) => console.log(values)}>
        {/* 用户名 */}
        <Form.Input field="keyword" label="用户名/关键字" />

        {/* 密码 */}
        <Form.Input field="password" label="密码" />

        <Button theme="solid" type="primary" block>
          登 录
        </Button>
      </Form>
    </>
  )
}

export default Login
