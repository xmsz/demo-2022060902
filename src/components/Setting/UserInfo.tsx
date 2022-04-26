import { SafetyCertificateFilled } from '@ant-design/icons';
import { useHover, useUnmount } from 'ahooks';
import React, { useRef } from 'react';
import { Image } from 'antd';
import { useStoreSelector, useStoreDispatch } from '@/stores';

export function Avatar({ size = 64, url }: { size?: number; url: string }) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const isHover = useHover(divRef.current);

  useUnmount(() => {
    divRef.current = null;
  });

  return (
    <div
      ref={divRef}
      className="flex justify-center items-center w-17 h-16 overflow-hidden"
      style={{ width: `${size + 4}px`, height: `${size}px` }}
    >
      <div
        className="relative  rounded-full overflow-hidden"
        style={{
          width: `${size + 4}px`,
          height: `${size + 4}px`,
        }}
      >
        <Image preview={false} src={url} />

        <div
          style={{ opacity: isHover ? 1 : 0 }}
          className="absolute z-1 left-0 bottom-0 w-full text-center text-white text-13px font-bold cursor-default"
        >
          编辑
          <div
            className="absolute -z-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ boxShadow: '0 30px 30px 30px black' }}
          />
        </div>
      </div>
    </div>
  );
}

function UserName({ name }: { name: string }) {
  return (
    <div className="px-3">
      <div className="text-[#242424] text-5 font-medium cursor-default">
        {name}
      </div>
      <div className="text-[#575757] text-12px font-medium cursor-default">
        这里是{name}的小尾巴~
      </div>
    </div>
  );
}

function UserInfo({ onAccountClick }: { onAccountClick: () => void }) {
  const userState = useStoreSelector((state) => state.user);
  const dispatch = useStoreDispatch();

  return (
    <div className="flex justify-between items-center px-8 h-28 border-0 border-b-1px border-b-[#d3cfd0] bg-[#efecee]">
      <div className="flex items-start">
        <Avatar url={userState.info.avatar} />
        <UserName name={userState.info.name} />
      </div>
      <div
        className="flex flex-col justify-center items-center"
        onClick={onAccountClick}
      >
        <SafetyCertificateFilled
          className="text-8"
          style={{ color: '#52c41a' }}
        />
        <span className="py-1 text-12px text-[#797a7a] font-medium">账号</span>
      </div>
    </div>
  );
}
export default UserInfo;
