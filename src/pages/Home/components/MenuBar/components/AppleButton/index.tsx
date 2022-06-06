import AppleIcon from '@/assets/images/apple-logo.png';
import SystemSetting from '@/components/SystemSetting';
import { useMemoizedFn } from 'ahooks';
import { AppOpen } from '../../../../../../components/WindowWrapper';
import MenuPopup from '../MenuPopup';

const MenuList = [
  {
    title: '关于本机',
    separator: true,
    rightLabel: '',
  },
  {
    title: '系统偏好设置',
    separator: false,
    rightLabel: '',
  },
  {
    title: '应用商店...',
    separator: true,
    rightLabel: '8项更新',
  },
  {
    title: '最近使用的项目',
    separator: true,
    rightLabel: '',
  },
  {
    title: '强制退出',
    separator: true,
    rightLabel: '⌥⌘⎋',
  },
  {
    title: '睡眠',
    separator: false,
    rightLabel: '',
  },
  {
    title: '重新启动...',
    separator: false,
    rightLabel: '',
  },
  {
    title: '关机...',
    separator: true,
    rightLabel: '',
  },
  {
    title: '锁定屏幕',
    separator: false,
    rightLabel: '^⌘Q',
  },
  {
    title: '退出登录...',
    separator: false,
    rightLabel: '⇧⌘Q',
  },
];

interface Props {
  active: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

function AppleButton({ active, onClick, onMouseEnter }: Props) {
  const handleMenuItemClick = useMemoizedFn((title: string) => {
    switch (title) {
      case '系统偏好设置':
        AppOpen({
          id: 'systemPreferences',
          headContent: SystemSetting.HeaderElement,
          content: <SystemSetting />,
        });
        break;

      default:
        break;
    }
  });

  return (
    <button
      className="relative px-2 h-6 rounded transition-all duration-200"
      style={{
        backgroundColor: active ? 'rgba(255,255,255,0.3)' : 'transparent',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <img className="w-3" src={AppleIcon} />
      {active && <MenuPopup list={MenuList} onItemClick={handleMenuItemClick} />}
    </button>
  );
}

export default AppleButton;
