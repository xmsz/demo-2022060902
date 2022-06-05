import React, { useState } from 'react';
import defaultBackgroundImage from '@/assets/images/surtur-wallpaper.jpg';
import { useDebounceFn, useRequest } from 'ahooks';
import services from '@/services';
import { IPage, IWallpaperItem } from '@/interface';
import MenuList from '../MenuList';

function DesktopAndScreensaver() {
  const [activeKey, setActiveKey] = useState('desktop');
  const [bgPositionVisible, setBgPostionVisible] = useState(false);

  const { data, run } = useRequest(async (page = 0, pageSize = 16) => {
    const res = await services.wallpaper.list({ page, pageSize });

    const result: IPage<IWallpaperItem> = {
      ...res,
      list: (data?.list || []).concat(res.list),
    };

    return result;
  });

  const { run: handleScroll } = useDebounceFn(
    (e) => {
      const scrollHeight = e.target.scrollHeight ?? 0;
      const scrollTop = e.target.scrollTop ?? 0;
      const clientHeight = e.target.clientHeight ?? 0;
      if (scrollTop === 0) return;

      if (scrollHeight - scrollTop - clientHeight <= 20) {
        run((data?.page || 0) + 1, data?.pageSize || 24);
      }
    },
    {
      wait: 50,
    },
  );

  return (
    <div
      className="w-full p-3 pt-8 bg-gray-50"
      style={{
        width: '666px',
      }}
    >
      <div className="relative p-4 pr-3 pt-7 rounded border border-gray-200 bg-gray-100">
        <div className="absolute z-10 left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center text-sm rounded-md border border-gray-300 bg-gray-200">
          {[
            { label: '桌面', value: 'desktop' },
            { label: '屏幕保护程序', value: 'screensaver' },
          ].map((item) => {
            return (
              <div
                className={`px-2.5 border-b border-transparent ${
                  activeKey === item.value ? ' rounded-md border-gray-100 bg-white' : ''
                } cursor-default`}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 py-6 px-4 pt-0">
          <div className="px-2 py-1 border-2 border-white rounded-1">
            <div
              className="w-32 h-18 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url(${defaultBackgroundImage})`,
              }}
            />
          </div>

          <div className="pt-2">
            <div className="text-sm">Mac</div>
            <div className="relative my-2">
              <div
                className="flex items-center px-0.5 w-40 border border-gray-300 rounded bg-white"
                onClick={() => {
                  setBgPostionVisible(true);
                }}
              >
                <div className="flex-grow text-sm px-1.5">充满屏幕</div>
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

              {bgPositionVisible && (
                <div
                  className="absolute z-10 -left-1 -top-1 p-1 rounded-md bg-gray-200 bg-opacity-65 shadow"
                  style={{
                    minWidth: '160px',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {[
                    { title: '充满屏幕', selected: true },
                    { title: '适合于屏幕', selected: false },
                    { title: '拉伸以充满屏幕', selected: false },
                    { title: '居中', selected: false },
                  ].map((item) => {
                    return (
                      <div
                        className="flex items-center rounded cursor-default hover:text-white hover:bg-blue-500"
                        onClick={() => {
                          setBgPostionVisible(false);
                        }}
                      >
                        <div className={`flex-shrink-0 text-sm px-1 ${item.selected ? 'opacity-100' : 'opacity-0'}`}>
                          ✓
                        </div>
                        <div className="py-0.5 text-sm whitespace-nowrap rounded-md ">{item.title}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex bg-white">
          <div className="flex-shrink-0 w-44">
            <MenuList list={[{ title: 'Apple', children: [{ title: '桌面图片' }] }]} />
          </div>
          <div
            className="flex flex-wrap gap-3 flex-grow pl-3 py-2.5 box-border border border-gray-300 overflow-auto"
            style={{ height: '272px' }}
            onScroll={handleScroll}
          >
            {data?.list.map((item) => {
              return (
                <div
                  className="bg-no-repeat bg-cover bg-center"
                  style={{ width: '94px', height: '60px', backgroundImage: `url(${item.url})` }}
                />
              );
            })}
          </div>
        </div>

        <div className="flex py-2">
          <div className="flex flex-shrink-0 w-44">
            <div className="flex items-center h-5 border border-gray-300 rounded-md shadow bg-white">
              <div className="flex justify-center items-center w-6 h-4">
                <svg width="1em" height="1em" viewBox="0 0 24 24" fontSize={16}>
                  <path fill="#333" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"></path>
                </svg>
              </div>
              <div className="h-3 bg-gray-200" style={{ width: '1px' }} />
              <div className="flex justify-center items-center w-6 h-4">
                <svg width="1em" height="1em" viewBox="0 0 20 20" fontSize={16}>
                  <path fill="#ccc" d="M4 9h12v2H4z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <div className="w-3.5 h-3.5 rounded border border-gray-300 bg-white" />
              <div className="ml-1.5 text-sm select-none">更改图片</div>
            </div>
            <div className="flex items-center">
              <div className="w-3.5 h-3.5 rounded border border-gray-300 bg-white" />
              <div className="ml-1.5 text-sm text-gray-400 select-none">随机顺序</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopAndScreensaver;
