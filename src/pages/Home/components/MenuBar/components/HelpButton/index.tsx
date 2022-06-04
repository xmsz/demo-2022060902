import MenuPopup from '../MenuPopup';

const MenuList = [
  {
    title: '报告问题',
    separator: true,
    rightLabel: '',
  },
  {
    title: '联系我',
    separator: false,
    rightLabel: '',
  },
];

interface Props {
  active: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

function HelpButton({ active, onClick, onMouseEnter }: Props) {
  return (
    <button
      className="relative px-2 h-6 rounded transition-all duration-200"
      style={{
        backgroundColor: active ? 'rgba(255,255,255,0.3)' : 'transparent',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <b className="text-sm text-white">帮助</b>
      {active && <MenuPopup list={MenuList} />}
    </button>
  );
}

export default HelpButton;
