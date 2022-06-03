import AppleIcon from '@/assets/images/apple-logo.png';
import MenuPopup from '../MenuPopup';

const MenuList = [
  {
    title: 'About This Mac',
    separator: true,
    rightLabel: '',
  },
  {
    title: 'System Preferences',
    separator: false,
    rightLabel: '',
  },
  {
    title: 'App Store...',
    separator: true,
    rightLabel: '8 updates',
  },
  {
    title: 'Recent Items',
    separator: true,
    rightLabel: '',
  },
  {
    title: 'Force Quit',
    separator: true,
    rightLabel: '⌥⌘⎋',
  },
  {
    title: 'Sleep',
    separator: false,
    rightLabel: '',
  },
  {
    title: 'Restart...',
    separator: false,
    rightLabel: '',
  },
  {
    title: 'Shut Down...',
    separator: true,
    rightLabel: '',
  },
  {
    title: 'Lock Screen',
    separator: false,
    rightLabel: '^⌘Q',
  },
  {
    title: 'Log Out Soroush...',
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
      {active && <MenuPopup list={MenuList} />}
    </button>
  );
}

export default AppleButton;
