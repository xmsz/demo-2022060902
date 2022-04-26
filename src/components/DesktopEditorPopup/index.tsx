import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useHover, useRequest, useSize, useUnmount } from 'ahooks';
import { Drawer, DrawerProps } from 'antd';
import { useMemo, useRef } from 'react';

import compShowApi from '@/libs/compShowApi';
import services from '@/services';
import { useStoreDispatch, useStoreSelector } from '@/stores';
import { switchDesktop } from '@/stores/desktop';
import './index.css';

function EditorPopup({
  visible = false,
  onClose,
  afterClose,
}: {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
}) {
  const dispatch = useStoreDispatch();
  const desktopState = useStoreSelector((state) => state.desktop);
  const ref = useRef<HTMLDivElement | null>(null);

  const { data = [], refresh } = useRequest(services.desktop.list);

  const itemSize = useSize(ref.current);
  const size = useMemo(() => {
    if (data.length === 0 || !itemSize) return { width: 0, height: 0 };

    const maxWidth = 240;
    const computeWidth = (itemSize.width - data.length * 16) / data.length;
    const width = computeWidth > maxWidth ? maxWidth : computeWidth;

    return { width, height: width / 1.8 };
  }, [itemSize, data.length]);

  useUnmount(() => {
    ref.current = null;
  });

  return (
    <Drawer
      {...DrawerConfigProps}
      visible={visible}
      onClose={onClose}
      afterVisibleChange={(visible) => {
        !visible && afterClose?.();
      }}
    >
      <div className="relative flex justify-center pr-24 pl-12 overflow-hidden">
        <div
          className={`absolute z-0 left-0 top-0 w-full h-screen bg-cover bg-no-repeat bg-center blur-md`}
          style={{ backgroundImage: `url(${desktopState.imageUrl})` }}
        />

        <div ref={ref} className="relative z-1 w-full h-52">
          <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-4 w-full h-52">
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={async () => {
                    services.desktop.select(item.id);
                    dispatch(
                      switchDesktop(await services.desktop.detail(item.id))
                    );
                  }}
                >
                  <div className="desktop-item relative">
                    <div
                      className={`overflow-hidden border-2 transition-all ease-linear  hover:scale-y-105 ${
                        item.id === desktopState.id
                          ? 'border-gray-500'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={item.backgroundUrl}
                        style={{ width: size.width, height: size.height }}
                      />
                    </div>

                    {data.length > 1 && item.id !== desktopState.id && (
                      <CloseCircleFilled
                        className={`desktop-item-close-icon absolute z-2 left-0 top-0 -translate-x-1/3 -translate-y-1/2 rounded-full text-5 bg-[rgba(0,0,0,0.3)]`}
                        style={{ color: '#fff' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.id === desktopState.id) return;
                          services.desktop.delete(item.id).then(refresh);
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <PlusOutlined
          className="absolute z-1 right-12 top-1/2 -translate-y-1/2 translate-x-1/2 font-bold text-white text-4xl cursor-pointer opacity-30 hover:opacity-70"
          onClick={() => {
            services.desktop.create().then(refresh);
          }}
        />
      </div>
    </Drawer>
  );
}

const DrawerConfigProps: DrawerProps = {
  placement: 'top',
  className: 'ant-drawer-content-transparent',
  maskStyle: { background: 'transparent' },
  headerStyle: { display: 'none' },
  bodyStyle: { padding: 0 },
  height: 'auto',
};

function DesktopEditorPopup({
  visible = false,
  onClose,
  afterClose,
}: {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
}) {
  const desktopState = useStoreSelector((state) => state.desktop);
  const ref = useRef<HTMLDivElement | null>(null);

  const { data = [], refresh } = useRequest(services.desktop.list);

  useHover(ref.current, {
    onEnter: () => {
      compShowApi(EditorPopup);
      onClose?.();
    },
  });

  return (
    <Drawer
      {...DrawerConfigProps}
      visible={visible}
      onClose={onClose}
      afterVisibleChange={(visible) => {
        !visible && afterClose?.();
      }}
    >
      <div className="relative flex justify-center pr-24 pl-12 overflow-hidden">
        <div
          className={`absolute z-0 left-0 top-0 w-full h-screen bg-cover bg-no-repeat bg-center blur-md`}
          style={{ backgroundImage: `url(${desktopState.imageUrl})` }}
        />
        <div
          ref={ref}
          className="relative z-1 py-3 flex justify-center items-center gap-4"
        >
          {data.map((item, itemIdx) => (
            <div
              key={item.id}
              className={`px-1 rounded-md border border-gray-400 bg-gray-400 ${
                item.id === desktopState.id
                  ? 'text-black bg-white'
                  : 'text-black'
              } `}
            >
              桌面{itemIdx + 1}
            </div>
          ))}
        </div>

        <PlusOutlined
          className="absolute z-1 right-12 top-1/2 -translate-y-1/2 translate-x-1/2 font-bold text-white text-lg cursor-pointer opacity-30 hover:opacity-70"
          onClick={() => {
            services.desktop.create().then(refresh);
          }}
        />
      </div>
    </Drawer>
  );
}

export default DesktopEditorPopup;
