import { IWindowProvider } from '@/libs/window';
import { PropsWithChildren, ReactNode } from 'react';
import WindowAction from '../WindowAction';

interface IProps extends IWindowProvider {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  header?: ReactNode;
}

export default function WindowWrapper({
  children,
  title,
  dragTarget,
  className,
  style,
  header,
  onActive,
  onClose,
}: PropsWithChildren<IProps>) {
  return (
    <div
      className={`rounded-xl bg-white overflow-hidden ${className}`}
      style={{
        minWidth: '640px',
        boxShadow: '5px 15px 20px 10px rgba(0,0,0,0.1)',
        border: '1px solid #c5c5c7',
        ...style,
      }}
    >
      {header ? (
        header
      ) : (
        <div ref={dragTarget} onClick={onActive}>
          <div
            className="flex items-center px-2 h-12 border-0 border-b"
            style={{
              borderColor: '#d3cfd0',
              backgroundColor: '#f4eeef',
            }}
          >
            <WindowAction size={10} onClose={onClose} />
            <div className="p-2 font-bold text-base">{title}</div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
