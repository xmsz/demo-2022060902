import { ReactNode, useEffect, useState } from 'react';
import EventEmitter from 'events';
import { useMemoizedFn } from 'ahooks';
import AvatarUrl from '@/assets/images/avatar.png';
import DesktopAppUrl from '@/assets/images/desktop-app.png';
import DesktopAndScreensaver from './DesktopAndScreensaver';

const eventEmitter = new EventEmitter();

interface ISettingItem {
  id: string;
  name: string;
  title: string | ReactNode;
  icon: string;
}

const FirstSettingList: ISettingItem[] = [
  {
    id: 'desktopAndScreensaver',
    name: '屏幕保护程序',
    title: (
      <p>
        桌面与 <br />
        屏幕保护程序
      </p>
    ),
    icon: DesktopAppUrl,
  },
];

function SystemSetting() {
  const [list, setList] = useState<Array<{ id: string; content: ReactNode }>>([]);
  const [lastItem, setLastItem] = useState<ISettingItem>({ id: '', name: '', title: '', icon: '' });
  const [current, setCurrent] = useState('home');

  const handleUpdateTitle = useMemoizedFn((title: string) => {
    eventEmitter.emit('onTitleUpdate', title);
  });

  const handleUpdateBFStatus = useMemoizedFn((payload: { back: boolean; forward: boolean }) => {
    eventEmitter.emit('onBFStstusUpdate', payload);
  });

  const handleClickSettingItem = useMemoizedFn((item: ISettingItem) => {
    function update(info: ISettingItem) {
      setCurrent(info.id);
      setLastItem(info);
      handleUpdateTitle(info.name);
      handleUpdateBFStatus({
        back: true,
        forward: false,
      });
    }

    if (list.findIndex((findItem) => findItem.id === item.id) >= 0) {
      update(item);
      return;
    }

    switch (item.id) {
      case 'desktopAndScreensaver':
        setList((pre) => {
          const next = [...pre];
          next.push({ id: item.id, content: <DesktopAndScreensaver key={item.id} /> });
          return next;
        });
        update(item);
        break;

      default:
        break;
    }
  });

  const onSettingBack = useMemoizedFn(() => {
    setCurrent(() => {
      handleUpdateTitle('系统与偏好设置');
      return 'home';
    });

    handleUpdateBFStatus({
      back: false,
      forward: true,
    });
  });

  const onSettingForward = useMemoizedFn(() => {
    setCurrent(lastItem.id);
    handleUpdateTitle(lastItem.name);

    handleUpdateBFStatus({
      back: true,
      forward: false,
    });
  });

  useEffect(() => {
    eventEmitter.on('onSettingBack', onSettingBack);
    eventEmitter.on('onSettingForward', onSettingForward);
    return () => {
      eventEmitter.off('onSettingBack', onSettingBack);
      eventEmitter.off('onSettingForward', onSettingForward);
    };
  }, []);

  return (
    <div
      style={{
        width: '666px',
      }}
    >
      {current === 'home' && (
        <>
          <div className="flex justify-between items-center h-28 bg-gray-50">
            <div className="flex items-start px-8 gap-2">
              <div className="flex justify-center items-center w-16 h-16 overflow-hidden" style={{ height: '60px' }}>
                <div
                  className="w-16 h-16 rounded-full bg-no-repeat bg-center bg-cover"
                  style={{ backgroundImage: `url(${AvatarUrl})` }}
                />
              </div>
              <div>
                <p className="text-lg">毅以异</p>
                <p className="text-xs">Apple ID、iCloud、媒体与App Store</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 bg-gray-100">
            {FirstSettingList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center w-26 h-28"
                  onClick={() => {
                    handleClickSettingItem(item);
                  }}
                >
                  <div
                    className="w-12 h-12 bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${item.icon})`,
                    }}
                  />
                  <div className="text-xs text-center" style={{ color: '#666' }}>
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {list.filter((item) => item.id === current).map((item) => item.content)}
    </div>
  );
}

function Header() {
  const [title, setTitle] = useState('系统偏好设置');
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(false);

  const onBFStstusUpdate = useMemoizedFn((value: { back: boolean; forward: boolean }) => {
    setBack(value.back);
    setForward(value.forward);
  });

  const onTitleUpdate = useMemoizedFn((value: string) => {
    setTitle(value);
  });

  useEffect(() => {
    eventEmitter.on('onBFStstusUpdate', onBFStstusUpdate);
    eventEmitter.on('onTitleUpdate', onTitleUpdate);
    return () => {
      eventEmitter.off('onBFStstusUpdate', onBFStstusUpdate);
      eventEmitter.off('onTitleUpdate', onTitleUpdate);
    };
  }, []);

  return (
    <div className="flex items-center pl-14 w-full h-13 bg-gray-50">
      <div className="flex items-center">
        <div
          className={`pl-2 pr-2.5 py-1 rounded bg-transparent ${back ? 'hover:bg-[#efefef]' : ''}`}
          onClick={() => {
            if (!back) return;
            eventEmitter.emit('onSettingBack');
          }}
        >
          <svg width="1em" height="1em" fontSize="18" viewBox="0 0 24 24">
            <path
              fill={`${back ? '#999' : '#d8d4d5'} `}
              d="M15.125 21.1L6.7 12.7q-.15-.15-.212-.325q-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.862q0 .513-.375.888t-.875.375q-.5 0-.875-.375Z"
            ></path>
          </svg>
        </div>
        <div
          className={`pl-2.5 pr-2 py-1 rounded bg-transparent ${forward ? 'hover:bg-[#efefef]' : ''}`}
          onClick={() => {
            if (!forward) return;
            eventEmitter.emit('onSettingForward');
          }}
        >
          <svg width="1em" height="1em" fontSize="18" viewBox="0 0 24 24">
            <path
              fill={`${forward ? '#999' : '#d8d4d5'} `}
              d="M7.15 21.1q-.375-.375-.375-.888q0-.512.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375q.512 0 .887.375l8.4 8.425q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325L8.9 21.125q-.35.35-.862.35q-.513 0-.888-.375Z"
            ></path>
          </svg>
        </div>
      </div>
      <div title="显示全部" className="flex flex-col ml-2 p-2 rounded-md hover:bg-[#efefef]" style={{ gap: '2px' }}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex" style={{ gap: '2px' }}>
            {[1, 2, 3, 4].map((children) => (
              <div key={`${item}-${children}`} className="bg-gray-500" style={{ width: '3px', height: '3px' }} />
            ))}
          </div>
        ))}
      </div>
      <div>
        <b className="px-2 text-base text-gray-700">{title}</b>
      </div>
    </div>
  );
}

SystemSetting.HeaderElement = <Header />;

export default SystemSetting;
