import defaultBackgroundImage from '@/assets/images/surtur-wallpaper.jpg';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import WindowWrapper from '../../components/WindowWrapper';

export default () => {
  return (
    <div
      className="h-screen bg-cover"
      style={{
        backgroundImage: `url(${defaultBackgroundImage})`,
      }}
    >
      <MenuBar />
      <Desktop />
      <Dock />
      <WindowWrapper />
    </div>
  );
};
