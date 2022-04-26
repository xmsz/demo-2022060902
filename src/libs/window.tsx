import Store from '@/stores';
import { useEventListener, useUnmount } from 'ahooks';
import { Modal } from 'antd';
import { ModalFunc } from 'antd/lib/modal/confirm';
import React, { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Provider } from 'react-redux';
import { getUUID } from './utils';

export interface IWindowProvider {
  dragTarget?: React.MutableRefObject<HTMLDivElement | null>;
  onClose?: () => void;
  onActive?: () => void;
}

function DraggableWrapper({
  Comp,
  onActive,
  onClose,
}: {
  Comp: ComponentType<IWindowProvider>;
  onActive: () => void;
  onClose: () => void;
}) {
  const dragTarget = useRef<HTMLDivElement | null>(null);
  const [disabled, setDisabled] = useState(true);

  useEventListener(
    'mouseover',
    () => {
      disabled && setDisabled(false);
    },
    { target: dragTarget.current }
  );

  useEventListener(
    'mouseout',
    () => {
      !disabled && setDisabled(true);
    },
    { target: dragTarget.current }
  );

  useUnmount(() => {
    dragTarget.current = null;
  });

  return (
    // @ts-ignore 类型错误
    <Draggable
      positionOffset={{ x: '-50%', y: '-50%' }}
      disabled={disabled}
      onStart={(event, uiData) => {
        onActive();
      }}
    >
      <div className="absolute left-1/2 top-1/2 pointer-events-auto">
        <Comp dragTarget={dragTarget} onClose={onClose} onActive={onActive} />
      </div>
    </Draggable>
  );
}

const WindowContentWrapper = ({ children }: PropsWithChildren<{}>) => {
  return <Provider store={Store}>{children}</Provider>;
};

class ClassWindow {
  public create(comp: ComponentType<IWindowProvider>) {
    const windowId = getUUID();
    const destroy = () => this.destroy(windowId);
    const active = () => this.active(windowId);
    const window = (
      <DraggableWrapper
        key={windowId}
        Comp={comp}
        onActive={active}
        onClose={destroy}
      />
    );

    this.inst?.update((pre) => ({
      ...pre,
      content: (
        <WindowContentWrapper>
          {this.getChildrens(pre.content).concat(window)}
        </WindowContentWrapper>
      ),
    }));

    return {
      destroy,
      active,
    };
  }

  public register() {
    this.inst = Modal.confirm({
      mask: false,
      icon: null,
      width: 'auto',
      wrapClassName:
        'modal-footer-hidden modal-body-content-full modal-body-background-transparent modal-pointer-events-none',
    });
  }

  public destroyAll() {
    if (this.inst) {
      this.inst.destroy();
      this.inst = null;
    }
  }

  private inst: ReturnType<ModalFunc> | null = null;

  private destroy(id: string) {
    this.inst?.update((pre) => ({
      ...pre,
      content: (
        <WindowContentWrapper>
          {this.getChildrens(pre.content).filter(
            (item) => !String(item.key).includes(id)
          )}
        </WindowContentWrapper>
      ),
    }));
  }

  private active(id: string) {
    this.inst?.update((pre) => {
      const list = this.getChildrens(pre.content);
      const findIndex = list.findIndex((item) => String(item.key).includes(id));
      findIndex >= 0 && list.push(list.splice(findIndex, 1)[0]);
      return {
        ...pre,
        content: <WindowContentWrapper>{list}</WindowContentWrapper>,
      };
    });
  }

  private getChildrens(target: any): ReactElement[] {
    const result: ReactElement[] = [];
    if (target && target.props && target.props.children) {
      React.Children.forEach([...target.props.children], (child) =>
        result.push(child)
      );
    }
    return result;
  }
}

const WindowInst = new ClassWindow();

export default WindowInst;
