import Store from '@/stores';
import { ConfigProvider } from 'antd';
import {
  ComponentType,
  forwardRef,
  Ref,
  useImperativeHandle,
  useState,
} from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

type ICompShowApi = <T>(
  comp: ComponentType<T>,
  props?: T & {
    visible?: boolean;
  }
) => {
  hide: () => void;
};

const CompWrapper = <T extends { onClose?: () => void }>(
  {
    Comp,
    props,
    afterClose,
  }: {
    Comp: ComponentType<T>;
    props: T & { visible?: boolean; afterClose?: () => void };
    afterClose: () => void;
  },
  ref: Ref<{ hide: () => void }>
) => {
  const [visible, setVisible] = useState(true);

  useImperativeHandle(ref, () => ({
    hide: () => {
      setVisible(false);
    },
  }));

  return (
    <ConfigProvider>
      <Provider store={Store}>
        <Comp
          {...props}
          visible={visible}
          onClose={() => {
            setVisible(false);
            props.onClose?.();
          }}
          afterClose={() => {
            afterClose();
            props.afterClose?.();
          }}
        />
      </Provider>
    </ConfigProvider>
  );
};

const CompWrapperRef = forwardRef(CompWrapper);

const compShowApi: ICompShowApi = (comp, props) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  let instance: { hide: () => void } | null;

  const root = createRoot(container);

  const unmount = () => {
    container.parentNode?.removeChild(container);
    root.unmount();
  };

  root.render(
    <CompWrapperRef
      Comp={comp}
      props={{ ...props }}
      ref={(ref) => {
        instance = ref;
      }}
      afterClose={unmount}
    />
  );

  return {
    hide: () => {
      instance?.hide();
    },
  };
};

export default compShowApi;
