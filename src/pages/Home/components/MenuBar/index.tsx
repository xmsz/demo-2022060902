import store from '@/store';
import { useEffect, useState } from 'react';
import AppleButton from './components/AppleButton';
import DateButton from './components/DateButton';
import FinderButton from './components/FinderButton';

function MenuBar() {
  const [menuState, menuDispatch] = store.useModel('menu');
  const [currentActiveMenu, setCurrentActiveMenu] = useState<string>('');

  useEffect(() => {
    if (!menuState.isOpen) {
      setCurrentActiveMenu('');
    }
  }, [menuState.isOpen]);

  useEffect(() => {
    if (currentActiveMenu) {
      menuDispatch.openMenu();
    }
  }, [menuState.isOpen, currentActiveMenu]);
  return (
    <div className="fixed left-0 top-0 z-10 flex justify-between items-center w-screen h-6 bg-gray-600 bg-opacity-40">
      <div className="flex items-center px-2">
        <AppleButton
          active={currentActiveMenu === 'Apple'}
          onClick={() => {
            setCurrentActiveMenu((pre) => (pre !== 'Apple' ? 'Apple' : ''));
          }}
          onMouseEnter={() => {
            if (currentActiveMenu && currentActiveMenu !== 'Apple') {
              setCurrentActiveMenu('Apple');
            }
          }}
        />
        <FinderButton
          active={currentActiveMenu === 'Finder'}
          onClick={() => {
            setCurrentActiveMenu((pre) => (pre !== 'Finder' ? 'Finder' : ''));
          }}
          onMouseEnter={() => {
            if (currentActiveMenu && currentActiveMenu !== 'Finder') {
              setCurrentActiveMenu('Finder');
            }
          }}
        />
      </div>
      <div>
        <DateButton />
      </div>
    </div>
  );
}

export default MenuBar;
