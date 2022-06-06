import Desktop from './components/Desktop';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import WindowWrapper from '../../components/WindowWrapper';
import store from '@/store';

export default () => {
  const desktopState = store.useModelState('desktop');

  return (
    <div
      className="h-screen bg-cover"
      style={{
        backgroundImage: `url(${desktopState.background.imageUrl})`,
      }}
    >
      <MenuBar />
      <Desktop />
      <Dock />
      <WindowWrapper />
    </div>
  );
};
