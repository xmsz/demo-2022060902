import { useMount } from 'ahooks';
import { Button } from 'antd';
import services from '@/services';
import { useStoreDispatch, useStoreSelector } from '@/stores';
import { switchDesktop } from '@/stores/desktop';
import { useEffect, useState } from 'react';
import WindowInst from './libs/window';
import Setting from './components/Setting';
import DesktopEditorPopup from './components/DesktopEditorPopup';
import ApplicationList from './components/ApplicationList';

function App() {
  const [visible, setVisible] = useState(false);
  const desktopState = useStoreSelector((state) => state.desktop);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    WindowInst.register();
    return () => {
      WindowInst.destroyAll();
    };
  }, []);

  useMount(async () => {
    dispatch(switchDesktop(await services.desktop.default()));
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
            setVisible(true);
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
      <ApplicationList />

      <DesktopEditorPopup
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

export default App;
