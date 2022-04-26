import { ISettingItemInfo } from '.';
import { Image } from 'antd';

function SettingItem({
  iconUrl,
  name,
  onClick,
}: {
  iconUrl: string;
  name: string;
  onClick: () => void;
}) {
  return (
    <div className="py-4 px-5">
      <div
        className="flex flex-col justify-center items-center"
        onClick={onClick}
      >
        <div className="w-10 h-10">
          <Image src={iconUrl} preview={false} />
        </div>
        <div className="mt-1 text-12px text-[#797a7a]">{name}</div>
      </div>
    </div>
  );
}

function SettingList({
  onItemClick,
}: {
  onItemClick: (item: ISettingItemInfo) => void;
}) {
  return (
    <div className="flex flex-wrap border-0 border-b-1px border-b-[#d3cfd0] bg-[#e8e6e6]">
      <SettingItem
        iconUrl="https://image-1253987267.cos.ap-guangzhou.myqcloud.com/wallpaper.png"
        name="壁纸"
        onClick={() => {
          onItemClick({
            title: '壁纸',
            type: 'wallpaper',
          });
        }}
      />
    </div>
  );
}

export default SettingList;
