import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useHover, useUnmount } from 'ahooks';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

function BtnWrapper({
  children,
  size,
  style,
  onClick,
}: PropsWithChildren<{
  size: number;
  style: React.CSSProperties;
  onClick: () => void;
}>) {
  return (
    <div style={{ width: size + 2, height: size + 2 }} onClick={onClick}>
      <div className="relative w-full h-full rounded-full" style={style}>
        <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}

function BtnMarginBox({
  children,
  width,
  height,
}: PropsWithChildren<{ width: number; height: number }>) {
  return (
    <div className="flex justify-center items-center" style={{ width, height }}>
      {children}
    </div>
  );
}

function BtnClose({
  size,
  isHover = true,
  onClick,
}: {
  size: number;
  isHover?: boolean;
  onClick: () => void;
}) {
  return (
    <BtnWrapper
      size={size}
      style={{ backgroundColor: '#ef6152' }}
      onClick={onClick}
    >
      <PlusOutlined
        rotate={45}
        size={size}
        style={{ opacity: isHover ? 1 : 0 }}
      />
    </BtnWrapper>
  );
}

function BtnMinimize({
  size,
  isHover = true,
  onClick,
}: {
  size: number;
  isHover?: boolean;
  onClick: () => void;
}) {
  return (
    <BtnWrapper
      size={size}
      style={{ backgroundColor: '#f5b830' }}
      onClick={onClick}
    >
      <MinusOutlined style={{ opacity: isHover ? 1 : 0 }} />
    </BtnWrapper>
  );
}

type TWindowAction = 'close' | 'minimize';

function WindowAction({
  size = 14,
  actions = ['close'],
  onClose,
  onMinimize,
}: {
  size?: number;
  actions?: TWindowAction[];
  onClose?: () => void;
  onMinimize?: () => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const isHover = useHover(divRef.current);

  useUnmount(() => {
    divRef.current = null;
  });

  return (
    <div className="inline-block">
      <div
        ref={divRef}
        style={{ width: `${size}`, padding: `0 ${(size / 2).toFixed(0)}px` }}
        className="flex justify-start items-center"
      >
        {(actions.includes('close') || !actions.length) && (
          <BtnMarginBox width={size * 2} height={size * 2}>
            <BtnClose
              size={size}
              isHover={isHover}
              onClick={() => onClose?.()}
            />
          </BtnMarginBox>
        )}
        {(actions.includes('minimize') || !actions.length) && (
          <BtnMarginBox width={size * 2} height={size * 2}>
            <BtnMinimize
              size={size}
              isHover={isHover}
              onClick={() => onMinimize?.()}
            />
          </BtnMarginBox>
        )}
      </div>
    </div>
  );
}

export default WindowAction;
