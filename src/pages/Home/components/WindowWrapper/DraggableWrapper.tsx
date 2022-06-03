import BtnClose from '@/components/BtnClose';
import { ReactNode, useState } from 'react';
import Draggable from 'react-draggable';

function DraggableWrapper({
  title,
  headContent,
  content,
  onClose,
  onFocus,
}: {
  title?: string;
  headContent?: ReactNode;
  content: ReactNode;
  onClose: () => void;
  onFocus: () => void;
}) {
  const [disabled, setDisabled] = useState(false);

  return (
    <Draggable
      disabled={disabled}
      positionOffset={{ x: '-50%', y: '-50%' }}
      onStart={() => {
        onFocus();
      }}
    >
      <div
        className="absolute  left-1/2 top-1/2 inline-block pointer-events-auto shadow-lg overflow-hidden"
        style={{ minWidth: '320px', borderRadius: '10px' }}
        onClick={onFocus}
      >
        <div
          className={`relative flex items-center ${title ? 'h-13' : ''} bg-gray-100 border-b border-gray-200`}
          style={{
            minHeight: '36px',
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          <div className="absolute z-10 left-3 top-1/2 -translate-y-1/2 flex items-center">
            <BtnClose onClick={onClose} />
            {!headContent && <b className="ml-4 text-base text-black text-opacity-70">{title}</b>}
          </div>
          {headContent}
        </div>
        <div className="bg-gray-100">
          <div style={{ width: '600px' }}>{content}</div>
        </div>
      </div>
    </Draggable>
  );
}

export default DraggableWrapper;
