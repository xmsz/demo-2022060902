import { ReactNode, useEffect, useState } from 'react';
import EventEmitter from 'events';
import { useMemoizedFn } from 'ahooks';
import dayjs from 'dayjs';
import DraggableWrapper from './DraggableWrapper';
import store from '@/store';

const eventEmitter = new EventEmitter();

interface IWindowItem {
  id: string;
  comp: ReactNode;
}

function WindowWrapper() {
  const [state, setState] = useState<IWindowItem[]>([]);

  const menuDispatch = store.useModelDispatchers('menu');

  const onApplicationOpen = useMemoizedFn((value) => {
    menuDispatch.closeMenu();
    setState((pre) => [...pre, value]);
  });

  const onApplicationClose = useMemoizedFn((id: IWindowItem['id']) => {
    setState((pre) => {
      const next = [...pre];
      const findIdx = next.findIndex((item) => item.id === id);
      if (findIdx >= 0) {
        next.splice(findIdx, 1);
      }
      return next;
    });
  });

  const onApplicationFocus = useMemoizedFn((id: IWindowItem['id']) => {
    menuDispatch.closeMenu();
    setState((pre) => {
      const next = [...pre];
      const findIdx = next.findIndex((item) => item.id === id);
      if (findIdx >= 0) {
        const findItem = next[findIdx];
        next.splice(findIdx, 1);
        next.push(findItem);
      }
      return next;
    });
  });

  useEffect(() => {
    eventEmitter.on('onApplicationOpen', onApplicationOpen);
    eventEmitter.on('onApplicationClose', onApplicationClose);
    eventEmitter.on('onApplicationFocus', onApplicationFocus);
    return () => {
      eventEmitter.off('onApplicationOpen', onApplicationOpen);
      eventEmitter.off('onApplicationClose', onApplicationClose);
      eventEmitter.off('onApplicationFocus', onApplicationFocus);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen pointer-events-none"
      style={{
        zIndex: '999',
      }}
    >
      <div className="relative w-full h-full">{state.map((item) => item.comp)}</div>
    </div>
  );
}

export function AppOpen(payload: { title?: string; headContent?: ReactNode; content: ReactNode }) {
  const id = dayjs().valueOf();
  eventEmitter.emit('onApplicationOpen', {
    id,
    comp: (
      <DraggableWrapper
        key={id}
        {...payload}
        onClose={() => {
          eventEmitter.emit('onApplicationClose', id);
        }}
        onFocus={() => {
          eventEmitter.emit('onApplicationFocus', id);
        }}
      />
    ),
  });
}

export default WindowWrapper;
