import { tokenHelper } from '@/libs/token';
import { useStoreSelector } from '@/stores';
import { SmileFilled } from '@ant-design/icons';
import { useState } from 'react';
import { Avatar } from './UserInfo';

function Account({}: {}) {
  const userState = useStoreSelector((state) => state.user);

  const [activeKey, setActiveKey] = useState('username');

  return (
    <div className="flex justify-between">
      <div className="px-4 w-60 bg-[#efedee]">
        <div className="flex flex-col justify-center items-center py-8">
          <Avatar size={104} url={userState.info.avatar} />
          <span className="font-bold">{userState.info.name}</span>
        </div>
        <div className="pb-4">
          <div
            className="py-1 px-2 rounded-1 text-14px font-medium"
            style={{
              backgroundColor:
                activeKey === 'username' ? '#d8d6d7' : 'transparent',
            }}
          >
            <SmileFilled className="mr-1" />
            用户名
          </div>
        </div>
        <div className="h-1px bg-[#d8d6d7]" />
        <div className="py-4">
          <button
            className="px-2 py-2px text-13px  font-medium rounded-1 bg-white border-1px border-[#ddd] border-b-2px hover:cursor-default active:scale-90"
            onClick={() => {
              tokenHelper.clearToken();
              location.reload();
            }}
          >
            退出登录…
          </button>
        </div>
      </div>
      <div className="flex-1 bg-[#e8e6e6]">
        {activeKey === 'username' && (
          <div className="py-4 px-6">
            <div>
              <span className="font-bold">用户名：</span>
              <span className="text-14px">{userState.info.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
