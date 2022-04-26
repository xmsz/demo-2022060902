import { IWindowProvider } from '@/libs/window';
import React from 'react';
import WindowAction from '../WindowAction';
import BtnHistory from './BtnHistory';

interface IHeaderProps extends IWindowProvider {
  title?: string;
  canGo: boolean;
  canForward: boolean;
  onGo: () => void;
  onForward: () => void;
}

function Header({
  dragTarget,
  title,
  canForward,
  canGo,
  onForward,
  onGo,
  onClose,
  onActive,
}: IHeaderProps) {
  return (
    <div ref={dragTarget} onClick={onActive}>
      <div
        className="flex items-center px-2 h-12 border-0 border-b"
        style={{
          borderColor: '#d3cfd0',
          backgroundColor: '#f4eeef',
        }}
      >
        <WindowAction size={10} onClose={onClose} />
        <BtnHistory
          canForward={canForward}
          canGo={canGo}
          onGo={onGo}
          onForward={onForward}
        />
        <div className="p-2 font-bold text-base">{title}</div>
      </div>
    </div>
  );
}

export default Header;
