import { useRef } from 'react';
import { dockButtons } from './const';
import { useMemoizedFn } from 'ahooks';

function Dock() {
  const dockButtonsWrapper = useRef<HTMLDivElement | null>(null);

  const handleItemsMouseEnter = useMemoizedFn((itemIdx: number) => {
    const expandSize = 8;

    const buttonElements = (dockButtonsWrapper.current?.children || []) as HTMLCollectionOf<HTMLDivElement>;

    buttonElements[itemIdx].style.width = `${expandSize}rem`;
    if (itemIdx > 0 && buttonElements[itemIdx - 1]) {
      buttonElements[itemIdx - 1].style.width = `${expandSize - 1.5}rem`;
    }

    if (itemIdx > 0 && buttonElements[itemIdx - 2]) {
      buttonElements[itemIdx - 2].style.width = `${expandSize - 2.5}rem`;
    }

    if (itemIdx > 0 && buttonElements[itemIdx + 1]) {
      buttonElements[itemIdx + 1].style.width = `${expandSize - 1.5}rem`;
    }

    if (itemIdx > 0 && buttonElements[itemIdx + 2]) {
      buttonElements[itemIdx + 2].style.width = `${expandSize - 2.5}rem`;
    }
  });

  const handleItemsMouseLeave = useMemoizedFn((itemIdx: number) => {
    const unexpandSize = 4;

    const buttonElements = (dockButtonsWrapper.current?.children || []) as HTMLCollectionOf<HTMLDivElement>;

    buttonElements[itemIdx].style.width = `${unexpandSize}rem`;
    if (itemIdx > 0 && buttonElements[itemIdx - 1]) {
      buttonElements[itemIdx - 1].style.width = `${unexpandSize}rem`;
    }

    if (itemIdx > 0 && buttonElements[itemIdx - 2]) {
      buttonElements[itemIdx - 2].style.width = `${unexpandSize}rem`;
    }

    if (itemIdx > 0 && buttonElements[itemIdx + 1]) {
      buttonElements[itemIdx + 1].style.width = `${unexpandSize}rem`;
    }

    if (itemIdx > 0 && buttonElements[itemIdx + 2]) {
      buttonElements[itemIdx + 2].style.width = `${unexpandSize}rem`;
    }
  });

  return (
    <div
      ref={dockButtonsWrapper}
      className="fixed left-0 right-0 bottom-2 flex items-end m-auto px-2 w-max h-16 rounded-xl bg-white bg-opacity-10"
    >
      {dockButtons.map((item, itemIdx) => {
        return (
          <button
            key={item.title}
            className="p-2 w-16 align-bottom transition-all duration-200"
            onMouseEnter={() => {
              handleItemsMouseEnter(itemIdx);
            }}
            onMouseLeave={() => {
              handleItemsMouseLeave(itemIdx);
            }}
          >
            <img src={item.logo} className="w-full select-none" />
          </button>
        );
      })}
    </div>
  );
}

export default Dock;
