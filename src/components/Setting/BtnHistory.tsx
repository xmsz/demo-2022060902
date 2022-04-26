import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useHover, useUnmount } from 'ahooks';
import { useRef } from 'react';

function BtnHistory({
  canGo,
  canForward,
  onGo,
  onForward,
}: {
  canGo: boolean;
  canForward: boolean;
  onGo: () => void;
  onForward: () => void;
}) {
  const goRef = useRef<HTMLDivElement | null>(null);
  const forwardRef = useRef<HTMLDivElement | null>(null);

  const isGoHover = useHover(goRef);
  const isForwardHover = useHover(forwardRef);

  useUnmount(() => {
    goRef.current = null;
    forwardRef.current = null;
  });

  return (
    <div className="flex items-center px-2">
      <div
        ref={forwardRef}
        className="relative px-2 py-1 rounded"
        style={{
          backgroundColor:
            isForwardHover && canForward ? '#e5e1e2' : 'transparent',
        }}
        onClick={() => {
          if (!canForward) return;
          onForward();
        }}
      >
        <LeftOutlined
          className="relative z-1 text-4"
          style={{ color: canForward ? '#7b7a7e' : '#a8aba7' }}
        />
      </div>
      <div
        ref={goRef}
        className="relative px-2 py-1 rounded"
        style={{
          backgroundColor: isGoHover && canGo ? '#e5e1e2' : 'transparent',
        }}
        onClick={() => {
          if (!canGo) return;
          onGo();
        }}
      >
        <RightOutlined
          className="relative z-1 text-4"
          style={{ color: canGo ? '#7b7a7e' : '#a8aba7' }}
        />
      </div>
    </div>
  );
}

export default BtnHistory;
