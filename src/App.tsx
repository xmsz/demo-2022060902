import { useMemoizedFn, useMount, useUpdateEffect } from 'ahooks';
import { Button, Drawer } from 'antd';
import services from '@/services';
import { useStoreDispatch, useStoreSelector } from '@/stores';
import { switchDesktop } from '@/stores/desktop';
import { useEffect } from 'react';
import WindowInst from './libs/window';
import Setting from './components/Setting';
import compShowApi from './libs/compShowApi';
import DesktopEditorPopup from './components/DesktopEditorPopup';

function App() {
  const desktopState = useStoreSelector((state) => state.desktop);
  const dispatch = useStoreDispatch();

  const handleSwitchDesktop = useMemoizedFn(async (id?: string) => {
    dispatch(
      switchDesktop(
        await (id ? services.desktop.detail(id) : services.desktop.default())
      )
    );
  });

  useUpdateEffect(() => {
    handleSwitchDesktop(desktopState.id);
  }, [desktopState.id]);

  useEffect(() => {
    WindowInst.register();
    return () => {
      WindowInst.destroyAll();
    };
  }, []);

  useMount(() => {
    handleSwitchDesktop();
  });

  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${desktopState.imageUrl})`,
      }}
    >
      <header className="flex justify-end items-center p-4">
        <Button
          type="text"
          style={{ color: 'white' }}
          onClick={() => {
            compShowApi(DesktopEditorPopup, {});
          }}
        >
          切换桌面
        </Button>
        <Button
          type="text"
          style={{ color: 'white' }}
          onClick={() => {
            WindowInst.create(Setting);
          }}
        >
          设置
        </Button>
      </header>
    </div>
  );
}

export default App;
