import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

interface IMenuItem {
  title: string;
  menuId?: string;
  icon?: string;
  children?: Array<Omit<IMenuItem, 'children'>>;
}

interface IProps {
  list: IMenuItem[];
}

function MenuItem({
  value,
  activeId,
  onActive,
}: {
  value: IMenuItem;
  activeId: string;
  onActive: (item: Omit<IMenuItem, 'children'>) => void;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="cursor-default">
      <div
        className={`flex items-center ${activeId === value.menuId ? 'bg-blue-600 text-white' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onActive(value);
        }}
      >
        <div className="flex-shrink-0">
          {visible ? (
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fontSize={18}
              onClick={() => {
                setVisible(false);
              }}
            >
              <path
                fill={`${activeId === value.menuId ? '#fff' : '#888'}`}
                d="M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z"
              ></path>
            </svg>
          ) : (
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fontSize={18}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
            >
              <path
                fill={`${activeId === value.menuId ? '#fff' : '#888'}`}
                d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
              ></path>
            </svg>
          )}
        </div>
        <div className="text-sm">{value.title}</div>
      </div>
      {visible && (
        <div>
          {value.children?.map((item) => {
            return (
              <div
                key={item.menuId}
                className={`pl-7 text-sm ${activeId === item.menuId ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => {
                  onActive(item);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MenuList({ list }: IProps) {
  const [activeId, setActiveId] = useState('');

  const nextList = useMemo(
    () =>
      list.map((item, itemIdx) => ({
        ...item,
        menuId: `${itemIdx}-${dayjs().valueOf()}`,
        children: item.children?.map((childItem, childItemIdx) => ({
          ...childItem,
          menuId: `${itemIdx}-${childItemIdx}-${dayjs().valueOf()}`,
        })),
      })),
    [list],
  );

  return (
    <div>
      {nextList.map((item) => {
        return (
          <MenuItem
            key={item.menuId}
            value={item}
            activeId={activeId}
            onActive={(value: Omit<IMenuItem, 'children'>) => {
              setActiveId(value?.menuId || '');
            }}
          />
        );
      })}
    </div>
  );
}

export default MenuList;
