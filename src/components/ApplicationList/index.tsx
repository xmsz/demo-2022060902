import { BASE_ICON_BASE64 } from './icon';
import Timestamp from '../Timestamp';
import WindowInst from '@/libs/window';

const list = [
  {
    key: 'timestamp',
    name: '时间戳转换',
    desc: '在线时间戳转换',
    icon: '',
    onClick: () => {
      WindowInst.create(Timestamp);
    },
  },
];

function ApplicationList() {
  return (
    <div className="p-24px grid justify-evenly grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-8">
      {list.map((item) => {
        return (
          <div
            key={item.key}
            className="flex flex-col justify-center items-center active:scale-90"
            onClick={item.onClick}
          >
            <img
              src={item.icon ? item.icon : BASE_ICON_BASE64}
              className="mr-12px w-48px h-48px"
            />
            <div className="mt-1 text-4 text-white">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ApplicationList;
