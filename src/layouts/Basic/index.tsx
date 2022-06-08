import Login from '@/components/Login';
import { useMount } from 'ahooks';
import { PropsWithChildren, useState } from 'react';
import { render } from 'react-dom';

export const showLoginPopup = (onSuccess?: () => void) => {
  const container = document.createElement('div');
  const onClose = () => {
    container.parentNode?.removeChild(container);
  };

  document.body.appendChild(container);

  render(
    <Login
      onSuccess={() => {
        onSuccess?.();
        setTimeout(() => {
          onClose();
        }, 1200);
      }}
    />,
    container,
  );
};

function Basic({ children }: PropsWithChildren<{}>) {
  const [hasToken, setHasToken] = useState(false);

  useMount(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      showLoginPopup(() => {
        setHasToken(true);
      });
      return;
    }

    setHasToken(true);
  });

  return <>{hasToken ? children : null}</>;
}

export default Basic;
