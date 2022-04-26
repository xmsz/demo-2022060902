import { IWindowProvider } from '@/libs/window';
import WindowWrapper from '../WindowWrapper';

interface IProps extends IWindowProvider {}

function Setting({ dragTarget, onClose, onActive }: IProps) {
  return (
    <WindowWrapper
      title="设置"
      dragTarget={dragTarget}
      onActive={onActive}
      onClose={onClose}
    >
      123
    </WindowWrapper>
  );
}

export default Setting;
