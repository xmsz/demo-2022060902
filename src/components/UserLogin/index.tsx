import services from '@/services';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { tokenHelper } from '../../libs/token';

function LoginForm({
  loading,
  toRegister,
  onLogin,
}: {
  loading: boolean;
  toRegister: () => void;
  onLogin: (payload: { account: string; password: string }) => void;
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="w-400px p-6 pb-0 rounded">
      <Form
        onFinish={(values: { account: string; password: string }) => {
          onLogin(values);
        }}
      >
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请检查账号' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请检查密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入密码"
            type={`${passwordVisible ? 'text' : 'password'}`}
            suffix={
              passwordVisible ? (
                <EyeOutlined onClick={() => setPasswordVisible(false)} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(true)}
                />
              )
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-center items-center -mt-3 pb-2">
        <Button type="text" onClick={() => toRegister()} disabled={loading}>
          去注册
        </Button>
      </div>
    </div>
  );
}

function RegisterForm({
  loading,
  toLogin,
  onRegister,
}: {
  loading: boolean;
  toLogin: () => void;
  onRegister: (payload: { account: string; password: string }) => void;
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-w-400px p-6 pb-0 rounded">
      <Form
        onFinish={(values: { account: string; password: string }) => {
          onRegister(values);
        }}
      >
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请检查账号' }]}
        >
          <Input placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请检查密码' }]}
        >
          <Input
            placeholder="请输入密码"
            type={`${passwordVisible ? 'text' : 'password'}`}
            suffix={
              passwordVisible ? (
                <EyeOutlined onClick={() => setPasswordVisible(false)} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(true)}
                />
              )
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-center items-center -mt-3 pb-2">
        <Button disabled={loading} type="text" onClick={toLogin}>
          去登录
        </Button>
      </div>
    </div>
  );
}

function UserLogin({ visible = false }: { visible?: boolean }) {
  const [isLogin, setLogin] = useState(true);

  const { loading: loginLoading, runAsync: handleLogin } = useRequest(
    services.user.login,
    {
      manual: true,
      onSuccess: (data) => {
        const { token = '' } = data;
        tokenHelper.saveToken(token);

        if (!isLogin) return;
        location.reload();
      },
      onError: (err) => {
        let text = '登录失败，请检查参数';
        if (err.response.data) {
          text = err.response.data.message;
        }
        message.warning(text);
      },
    }
  );

  const { loading: registerLoading, runAsync: handleRegister } = useRequest(
    services.user.register,
    {
      manual: true,
      onSuccess: async (data, params) => {
        await handleLogin(params[0]);
        location.reload();
      },
      onError: (err) => {
        let text = '注册失败，请检查参数';
        if (err.response.data) {
          text = err.response.data.message;
        }
        message.warning(text);
      },
    }
  );

  return (
    <Modal
      visible={visible}
      mask
      closable={false}
      centered
      footer={null}
      width="auto"
      wrapClassName="modal-body-background-transparent modal-footer-hidden bg-[rgba(0,0,0,0.45)]"
      maskStyle={{
        background: 'white',
      }}
    >
      <div className="rounded-md overflow-hidden">
        <div
          className="p-4 border-0 border-b"
          style={{
            borderColor: '#d3cfd0',
            backgroundColor: '#f4eeef',
          }}
        >
          {isLogin ? '登录' : '注册'}
        </div>
        <div
          className="flex flex-wrap border-0 border-b bg-white"
          style={{
            borderColor: '#d3cfd0',
          }}
        >
          {isLogin ? (
            <LoginForm
              loading={loginLoading}
              toRegister={() => setLogin(false)}
              onLogin={handleLogin}
            />
          ) : (
            <RegisterForm
              loading={registerLoading}
              toLogin={() => setLogin(true)}
              onRegister={handleRegister}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default UserLogin;
