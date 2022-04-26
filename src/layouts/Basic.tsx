import { tokenHelper } from '@/libs/token';
import { useStoreDispatch } from '@/stores';
import { initUserInfo } from '@/stores/user';
import { useMemoizedFn, useMount } from 'ahooks';
import { PropsWithChildren, useState } from 'react';

export default ({ children }: PropsWithChildren<{}>) => {
  const [hasToken, setHasToken] = useState(false);
  const dispatch = useStoreDispatch();

  const init = useMemoizedFn(async () => {
    await dispatch(initUserInfo()).unwrap();
    setHasToken(true);
  });

  useMount(() => {
    tokenHelper.initToken().then(init);
  });

  return <>{hasToken ? children : null}</>;
};
