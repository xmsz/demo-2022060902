import store from '@/store';
import { useEffect, useState } from 'react';
import AppleButton from './components/AppleButton';
import DateButton from './components/DateButton';
import HelpButton from './components/HelpButton';

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
    <div
      className="fixed left-0 top-0 flex justify-between items-center w-screen h-6 bg-gray-600 bg-opacity-40"
      style={{
        zIndex: 1000,
      }}
    >
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
        <HelpButton
          active={currentActiveMenu === 'Help'}
          onClick={() => {
            setCurrentActiveMenu((pre) => (pre !== 'Help' ? 'Help' : ''));
          }}
          onMouseEnter={() => {
            if (currentActiveMenu && currentActiveMenu !== 'Help') {
              setCurrentActiveMenu('Help');
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
