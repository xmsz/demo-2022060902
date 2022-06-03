import { ReactNode, useState } from 'react';
import { Button } from '@alifd/next';
import dayjs from 'dayjs';
import Draggable from 'react-draggable';

function a() {
  return <div>123</div>;
}

const Home = () => {
  const [state, setState] = useState<
    Array<{
      id: string;
      comp: ReactNode;
    }>
  >([]);

  return (
    <div className="relative">
      <Button
        type="primary"
        onClick={() => {
          setState((pre) => [
            ...pre,
            {
              id: dayjs().valueOf().toString(),
              comp: <div className="w-20 h-20 bg-blue-300">123344</div>,
            },
          ]);
        }}
      >
        创建
      </Button>
      {state.map((item) => {
        return <Draggable key={item.id}>{item.comp}</Draggable>;
      })}
    </div>
  );
};

export default Home;

function add(comp: JSX.Element) {
  const id = 'xxxxxxx';
  // 事件通知添加
  const comps = <Draggable disabled={true}></Draggable>;

  return {
    hide: () => {
      // 事件通知移除
    },
    active: () => {
      // 事件通知激活
    },
  };
}
