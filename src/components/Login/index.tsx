import defaultBackgroundImage from '@/assets/images/surtur-wallpaper.jpg';
import DateText from './DateText';
import AvatarUrl from '@/assets/images/avatar.png';
import { PropsWithChildren, useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import services from '@/services';

function UserName({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      autoComplete="off"
      value={value}
      placeholder="输入账号"
      className="!bg-transparent text  px-4 mt-2 text-center text-white text-lg outline-none placeholder:text-white placeholder:text-opacity-30 placeholder:text-sm placeholder:leading-10 placeholder:shadow-none"
      style={{
        textShadow: value ? '1px 1px #000' : '',
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

function Password({
  value,
  onChange,
  onEnter,
}: {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
}) {
  return (
    <input
      value={value}
      autoComplete="new-password"
      type="password"
      placeholder="输入密码"
      className="px-4 mt-3 w-40 text-white text-opacity-90 text-sm leading-7 rounded-full outline-none shadow-lg placeholder:text-white placeholder:text-opacity-35 placeholder:text-xs"
      style={{
        backgroundColor: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(4px)',
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onEnter?.();
        }
      }}
    />
  );
}

function ActionButton({ children, text, onClick }: PropsWithChildren<{ text?: string; onClick?: () => void }>) {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div className="flex justify-center items-center w-8 h-8 rounded-full bg-white bg-opacity-20">{children}</div>
      <div className="text-xs text-white mt-2">{text}</div>
    </div>
  );
}

function Loading({ visible, content }: { visible?: boolean; content?: string }) {
  return visible ? (
    <div className="flex flex-col items-center gap-2">
      <div>
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <circle cx="12" cy="2" r="0" fill="#fff">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(45 12 12)">
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(90 12 12)">
            <animate
              attributeName="r"
              begin="0.25s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(135 12 12)">
            <animate
              attributeName="r"
              begin="0.375s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(180 12 12)">
            <animate
              attributeName="r"
              begin="0.5s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(225 12 12)">
            <animate
              attributeName="r"
              begin="0.625s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(270 12 12)">
            <animate
              attributeName="r"
              begin="0.75s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
          <circle cx="12" cy="2" r="0" fill="#fff" transform="rotate(315 12 12)">
            <animate
              attributeName="r"
              begin="0.875s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            ></animate>
          </circle>
        </svg>
      </div>
      <div className="text-xs text-white">{content}</div>
    </div>
  ) : null;
}

function RegisterForm({ goLogin, onSuccess }: { goLogin: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tips, setTips] = useState('');

  const register = useMemoizedFn(async () => {
    try {
      setTips('');
      setLoading(true);
      await services.user.add({ username, password });
      const res = await services.token.get({ username, password });
      localStorage.setItem('access_token', JSON.stringify(res.data.token));
      setLoadingText('自动登录中');
      setTimeout(() => {
        setLoading(false);
        setLoadingText('');
        onSuccess();
      }, 2000);
    } catch (err) {
      setLoading(false);
      setLoadingText('');
      setTips(err.response.data.message);
    }
  });

  return (
    <>
      <div className="relative flex flex-col items-center">
        <div className="mb-6">
          <svg width="8em" height="8em" viewBox="0 0 32 32">
            <path
              fill="#fff"
              d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0ZM20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5Z"
            ></path>
            <path
              fill="#999"
              opacity={0.65}
              d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8ZM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0Z"
            ></path>
          </svg>
        </div>

        <UserName value={username} onChange={setUsername} />
        <Password value={password} onChange={setPassword} />

        <div className="my-2 h-4 text-xs text-white">{tips}</div>

        <div className="absolute z-0 left-1/2 -bottom-12 -translate-x-1/2">
          <Loading visible={loading} content={loadingText} />
        </div>
      </div>
      <div className="absolute z-0 left-1/2 bottom-20 -translate-x-1/2">
        <div className="flex gap-8">
          <ActionButton text="返回" onClick={goLogin}>
            <svg width="1em" height="1em" viewBox="0 0 48 48">
              <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                <path d="m13 8l-7 6l7 7"></path>
                <path d="M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5c.284 7.27-5.723 13.5-12.996 13.5H11.998"></path>
              </g>
            </svg>
          </ActionButton>

          <ActionButton text="下一步" onClick={register}>
            <svg width="1em" height="1em" viewBox="0 0 12 12">
              <path
                fill="#fff"
                d="M2.646 2.854a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L5.793 6L2.646 2.854ZM10 2.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7Z"
              ></path>
            </svg>
          </ActionButton>
        </div>
      </div>
    </>
  );
}

function LoginForm({ goRegister, onSuccess }: { goRegister: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tips, setTips] = useState('');

  const login = useMemoizedFn(async () => {
    try {
      setLoading(true);
      const res = await services.token.get({ username, password });
      localStorage.setItem('access_token', JSON.stringify(res.data.token));
      setLoadingText('登录中');
      setTimeout(() => {
        setLoading(false);
        setLoadingText('');
        onSuccess();
      }, 2000);
    } catch (err) {
      setLoading(false);
      setLoadingText('');
      setTips(err.response.data.message);
    }
  });

  return (
    <>
      <div className="relative flex flex-col items-center">
        <div
          className="mb-6 w-32 h-32 rounded-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${AvatarUrl})`,
          }}
        />
        <UserName value={username} onChange={setUsername} />
        <Password value={password} onChange={setPassword} onEnter={login} />
        <div className="my-2 h-4 text-xs text-white">{tips}</div>
        <div className="absolute z-0 left-1/2 -bottom-12 -translate-x-1/2">
          <Loading visible={loading} content={loadingText} />
        </div>
      </div>
      <div className="absolute z-0 left-1/2 bottom-20 -translate-x-1/2">
        <ActionButton text="去注册" onClick={goRegister}>
          <svg width="1em" height="1em" viewBox="0 0 20 20">
            <path
              fill="#fff"
              d="M9.467 0c3.184 0 5.765 2.566 5.765 5.732a5.706 5.706 0 0 1-2.02 4.358c.27.134.516.268.738.403c.478.29.974.65 1.49 1.079a.685.685 0 0 1 .086.969a.694.694 0 0 1-.975.086a11.05 11.05 0 0 0-1.322-.96a11.403 11.403 0 0 0-1.405-.703a5.76 5.76 0 0 1-2.357.5a5.767 5.767 0 0 1-2.58-.605l-.042.02c-1.95.756-3.373 1.874-4.292 3.358c-.922 1.489-1.299 3.153-1.13 5.014a.689.689 0 0 1-.628.746a.69.69 0 0 1-.75-.623c-.195-2.152.249-4.113 1.33-5.858c.95-1.536 2.347-2.73 4.174-3.582a5.694 5.694 0 0 1-1.846-4.202C3.703 2.566 6.283 0 9.467 0Zm7.401 12.693c.38 0 .688.31.688.691v1.752h1.752a.69.69 0 0 1 .692.689a.69.69 0 0 1-.692.687h-1.752v1.753a.69.69 0 0 1-.688.691a.69.69 0 0 1-.688-.691v-1.753h-1.752a.69.69 0 0 1-.692-.687c0-.38.31-.688.692-.688l1.752-.001v-1.752a.69.69 0 0 1 .688-.691Zm-7.4-11.317c-2.42 0-4.382 1.95-4.382 4.356c0 2.406 1.962 4.357 4.381 4.357c2.42 0 4.381-1.95 4.381-4.357c0-2.406-1.961-4.356-4.38-4.356Z"
            ></path>
          </svg>
        </ActionButton>
      </div>
    </>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [mode, setMode] = useState('login');

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-cover bg-no-repeat bg-center"
      style={{
        zIndex: '9999',
        backgroundImage: `url(${defaultBackgroundImage})`,
      }}
    >
      <div className="relative flex justify-center items-center w-full h-full bg-black bg-opacity-20">
        <div className="absolute z-0 left-0 top-0 flex justify-end items-center w-full h-6">
          <DateText />
        </div>

        {mode === 'login' && (
          <LoginForm
            onSuccess={onSuccess}
            goRegister={() => {
              setMode('register');
            }}
          />
        )}

        {mode === 'register' && (
          <RegisterForm
            onSuccess={onSuccess}
            goLogin={() => {
              setMode('login');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
