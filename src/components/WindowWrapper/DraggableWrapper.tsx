import BtnClose from '@/components/BtnClose';
import { ReactNode, useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({ top: 0 });

  return (
    <Draggable
      disabled={disabled}
      bounds={bounds}
      positionOffset={{ x: '-50%', y: '-50%' }}
      onStart={(event, uiData) => {
        onFocus();

        const targetRect = ref.current?.getBoundingClientRect();
        setBounds(() => ({
          top: -(targetRect?.top || 0) + uiData.y + 24,
        }));
      }}
    >
      <div
        className="absolute  left-1/2 top-1/2 inline-block pointer-events-auto shadow-xl overflow-hidden"
        style={{ minWidth: '320px', borderRadius: '10px' }}
        onClick={onFocus}
      >
        <div
          className={`relative flex items-center ${title ? 'h-10' : ''} bg-gray-50 border-b border-gray-300`}
          style={{
            minHeight: '36px',
          }}
          ref={ref}
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
            {!headContent && <b className="ml-4 text-base text-black text-opacity-70 select-none">{title}</b>}
          </div>
          {headContent}
        </div>
        <div className="bg-gray-100">
          <div>{content}</div>
        </div>
      </div>
    </Draggable>
  );
}

export default DraggableWrapper;
