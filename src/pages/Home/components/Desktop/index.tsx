import store from '@/store';
import { useMemoizedFn } from 'ahooks';
import { ReactNode, useState } from 'react';
import TimeIconUrl from '@/assets/images/timestamp.png';
import { AppOpen } from '../../../../components/WindowWrapper';
import Timestamp from '@/components/Timestamp';
import NanoID from '@/components/NanoID';

interface IDesktopItem {
  id: string;
  title: string | ReactNode;
  icon: string;
}

const desktopList: IDesktopItem[] = [
  { id: 'timestamp', title: '时间戳转换', icon: TimeIconUrl },
  {
    id: 'nanoID',
    title: '字符串ID生成器',
    icon: 'https://camo.githubusercontent.com/c306d97014be1caa9a2a511a0ff4722d54a77b0b6c81a18c81113d6051408325/68747470733a2f2f61692e6769746875622e696f2f6e616e6f69642f6c6f676f2e737667',
  },
];

function Desktop() {
  const [focusId, setFocusId] = useState<IDesktopItem['id']>('');

  const menuDispatch = store.useModelDispatchers('menu');
  const handleClickAroundDesktop = useMemoizedFn(() => {
    setFocusId('');
    menuDispatch.closeMenu();
  });

  const handleClickDesktopItem = useMemoizedFn((id: string) => {
    setFocusId(id);
    menuDispatch.closeMenu();
  });

  const handleDoubleClickDesktopItem = useMemoizedFn((id: string) => {
    setFocusId('');
    menuDispatch.closeMenu();

    switch (id) {
      case 'timestamp':
        AppOpen({ title: '时间戳转换', content: <Timestamp /> });
        break;
      case 'nanoID':
        AppOpen({ title: '字符串ID生成器', content: <NanoID /> });

      default:
        break;
    }
  });

  return (
    <div className="flex flex-col items-end pt-6 h-screen" onClick={handleClickAroundDesktop}>
      {desktopList.map((item) => {
        const active = item.id === focusId;
        return (
          <button
            key={item.id}
            className="flex flex-col items-center w-32 my-2 p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleClickDesktopItem(item.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDoubleClickDesktopItem(item.id);
            }}
          >
            <div
              className={`px-1 py-2 rounded-md border-2 border-transparent ${
                active ? 'bg-gray-900 bg-opacity-30' : ''
              }`}
              style={{
                borderColor: active ? '#9CA3AF' : 'transparent',
              }}
            >
              <img className="w-12" src={item.icon} />
            </div>
            <h3
              className={`mt-1 px-2 py-0.5  text-xs text-white font-bold whitespace-nowrap text-center rounded-md select-none ${
                active ? 'bg-blue-700' : ''
              }`}
            >
              {item.title}
            </h3>
          </button>
        );
      })}
    </div>
  );
}

export default Desktop;
