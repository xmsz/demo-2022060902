import services from '@/services';
import { useStoreDispatch, useStoreSelector } from '@/stores';
import { switchDesktop } from '@/stores/desktop';
import { FolderOpenFilled } from '@ant-design/icons';
import { useDebounceFn, useMemoizedFn, useRequest, useUnmount } from 'ahooks';
import { Collapse, Image, List } from 'antd';
import React, { useState } from 'react';
import { getDisplayStyle } from '.';

function SystemWallpaperList() {
  const [pageInfo, setPageInfo] = useState<
    IPage<{ title: string; url: string }>
  >({
    page: 0,
    pageSize: 16,
    last: true,
    list: [],
    total: 0,
  });
  const [url, setUrl] = useState('');

  const desktopState = useStoreSelector((state) => state.desktop);
  const dispatch = useStoreDispatch();

  const { refresh: reloadList } = useRequest(
    () => services.walles.list(pageInfo.page, pageInfo.pageSize),
    {
      onSuccess: (data) => {
        setPageInfo((preValue) => ({
          ...preValue,
          ...data,
          page: data.page + 1,
          list: preValue.list.concat(data.list),
        }));
      },
    }
  );

  const { run: handleScroll } = useDebounceFn(
    (e) => {
      const scrollHeight = e.target.scrollHeight ?? 0;
      const scrollTop = e.target.scrollTop ?? 0;
      const clientHeight = e.target.clientHeight ?? 0;
      if (scrollTop === 0) return;

      if (scrollHeight - scrollTop - clientHeight <= 20) {
        reloadList();
      }
    },
    {
      wait: 50,
    }
  );

  useUnmount(() => {
    if (!url) return;
    services.desktop.updateBackground(desktopState.id, url);
  });

  return (
    <div
      className="px-4 py-3 w-full h-full overflow-scroll"
      onScroll={handleScroll}
    >
      <List
        dataSource={pageInfo.list}
        locale={{
          emptyText: '加载中...',
        }}
        grid={{ gutter: 7, column: 4 }}
        renderItem={(item) => (
          <List.Item key={item.url} className="flex items-center w-23">
            <Image
              src={item.url}
              preview={false}
              className="bg-cover"
              onClick={() => {
                dispatch(
                  switchDesktop({
                    id: desktopState.id,
                    backgroundUrl: item.url,
                    name: '',
                  })
                );
                setUrl(item.url);
              }}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

function OriginList({
  currentKey,
  onSelect,
}: {
  currentKey: string;
  onSelect: (key: string) => void;
}) {
  const getActiveStyle = useMemoizedFn(
    (isActive: boolean): React.CSSProperties => {
      return {
        backgroundColor: isActive ? '#2857db' : 'transparent',
        color: isActive ? '#fff' : '#2d2d2d',
      };
    }
  );

  return (
    <Collapse
      ghost
      className="collapse-custom-padding"
      defaultActiveKey={['system-image']}
    >
      <Collapse.Panel header="系统" key="system-image">
        <div
          className="collapse-custom-content-box-item cursor-pointer"
          style={{ ...getActiveStyle(currentKey === 'system-image') }}
        >
          <FolderOpenFilled className="mr-1" />
          图片
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}

function Wallpaper() {
  const [origin, setOrigin] = useState('system-image');
  const desktopState = useStoreSelector((state) => state.desktop);

  return (
    <div className="py-2 px-4 pt-4 bg-[#efecee]">
      <div className="rounded-1 bg-[#e8e6e6]">
        <div className="flex items-start p-8">
          <div className="px-2 py-1 w-38 h-22 border-1px border-white rounded-1">
            <Image
              src={desktopState.imageUrl}
              preview={false}
              className="bg-cover"
            />
          </div>
        </div>
        <div className="px-5 pb-8">
          <div className="flex bg-white">
            <div className="w-44">
              <OriginList currentKey={origin} onSelect={setOrigin} />
            </div>
            <div className="flex-1 h-70 border-1px border-neutral-400">
              <div
                className="w-full h-full"
                style={{ ...getDisplayStyle(origin === 'system-image') }}
              >
                <SystemWallpaperList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallpaper;
