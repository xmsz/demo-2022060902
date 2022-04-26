import { IWindowProvider } from '@/libs/window';
import { useMemoizedFn } from 'ahooks';
import { useMemo, useState } from 'react';
import WindowWrapper from '../WindowWrapper';
import Header from './Header';
import UserInfo from './UserInfo';
import SubSetting from './SubSetting';
import SettingList from './SettingList';
import './index.css';

interface IProps extends IWindowProvider {}
export interface ISettingItemInfo {
  title: string;
  type: string;
}

export function getDisplayStyle(visible: boolean): {
  position: React.CSSProperties['position'];
  transform: React.CSSProperties['transform'];
  visibility: React.CSSProperties['visibility'];
} {
  return {
    position: visible ? 'relative' : 'absolute',
    transform: visible ? '' : 'translate3d(-200vw,-200vh,0)',
    visibility: visible ? 'visible' : 'hidden',
  };
}

function Setting({ dragTarget, onClose, onActive }: IProps) {
  const [config, setConfig] = useState<{
    list: ISettingItemInfo[];
    current: number;
  }>({
    list: [{ title: '设置', type: 'home' }],
    current: 0,
  });

  const headerProps = useMemo(() => {
    const currentItem = config.list[config.current];
    return {
      title: currentItem.title,
      canGo: config.list.length > 1 && config.current === 0,
      canForward: config.list.length > 1 && config.current !== 0,
      dragTarget,
      onGo: () => setConfig((preConfig) => ({ ...preConfig, current: 1 })),
      onForward: () => setConfig((preConfig) => ({ ...preConfig, current: 0 })),
      onClose,
      onActive,
    };
  }, [config, dragTarget, onClose, onActive]);

  const handleItemClick = useMemoizedFn((item: ISettingItemInfo) => {
    setConfig((preConfig) => ({
      ...preConfig,
      list: [preConfig.list[0], item],
      current: 1,
    }));
  });

  return (
    <WindowWrapper
      header={<Header {...headerProps} />}
      dragTarget={dragTarget}
      onActive={onActive}
      onClose={onClose}
    >
      <div
        style={{ ...getDisplayStyle(config.current === 0) }}
        onClick={onActive}
      >
        <UserInfo
          onAccountClick={() =>
            handleItemClick({ title: '账号', type: 'account' })
          }
        />
        <SettingList onItemClick={handleItemClick} />
      </div>

      <div onClick={onActive}>
        <SubSetting
          visible={config.current === 1}
          type={config.list[config.current].type}
        />
      </div>
    </WindowWrapper>
  );
}

export default Setting;
