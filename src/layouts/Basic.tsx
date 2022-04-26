import { tokenHelper } from '@/libs/token';
import { useMount } from 'ahooks';
import { PropsWithChildren, useState } from 'react';

export default ({ children }: PropsWithChildren<{}>) => {
  const [hasToken, setHasToken] = useState(false);

  useMount(() => {
    tokenHelper.initToken().then(() => {
      setHasToken(true);
    });
  });

  return <>{hasToken ? children : null}</>;
};
