import { useMemoizedFn } from 'ahooks';
import { useRef } from 'react';
import { render } from 'react-dom';

export interface ISelectorItem {
  label: string;
  value: string | number;
}

interface IProps {
  dataSource: ISelectorItem[];
  value: ISelectorItem['value'];
  className?: string;
  onSelect?: (value: ISelectorItem['value']) => void;
}

function Selector({ dataSource, value, className, onSelect }: IProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const showSelectorPopup = useMemoizedFn(() => {
    const container = document.createElement('div');
    const onClose = () => {
      container.parentNode?.removeChild(container);
    };

    document.body.appendChild(container);

    render(
      <div
        className="fixed  left-0 top-0 w-screen h-screen"
        style={{
          zIndex: '1000',
        }}
        onClickCapture={onClose}
        onClick={onClose}
      >
        <div
          className="absolute z-0  p-1 rounded-md shadow"
          style={{
            left: ref.current?.getBoundingClientRect().left,
            top: ref.current?.getBoundingClientRect().top,
            minWidth: '160px',
            backgroundColor: 'rgba(250,250,250,0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {dataSource.map((item) => {
            return (
              <div
                key={item.value}
                className="flex items-center rounded cursor-default hover:text-white hover:bg-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(item.value);
                  onClose();
                }}
              >
                <div className={`flex-shrink-0 text-sm px-1 ${item.value === value ? 'opacity-100' : 'opacity-0'}`}>
                  ✓
                </div>
                <div className="py-0.5 pr-3 text-sm whitespace-nowrap rounded-md ">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>,
      container,
    );
  });

  return (
    <div ref={ref} className={`my-2 ${className}`}>
      <div
        className="flex items-center px-0.5 border border-gray-300 rounded bg-white cursor-default"
        onClick={showSelectorPopup}
      >
        <div className="flex-grow text-sm px-1.5 select-none">
          {dataSource.find((item) => item.value === value)?.label}
        </div>
        <div
          className="relative flex-shrink-0 w-4 h-4 rounded cursor-default"
          style={{
            backgroundColor: '#1283ff',
          }}
        >
          <div className="absolute z-0 left-1/2 top-0 -translate-x-1/2 -translate-y-1">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fontSize={17}>
              <path fill="#fff" d="M7.4 15.4L6 14l6-6l6 6l-1.4 1.4l-4.6-4.6Z"></path>
            </svg>
          </div>

          <div className="absolute z-0 left-1/2 bottom-0 -translate-x-1/2 translate-y-1">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fontSize={17}>
              <path
                fill="#fff"
                d="M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selector;
