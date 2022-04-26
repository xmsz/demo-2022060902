import React from 'react';
import { getDisplayStyle } from '.';
import Account from './Account';
import Wallpaper from './Wallpaper';

function SubSetting({ visible, type }: { visible: boolean; type: string }) {
  return (
    <>
      <div style={{ ...getDisplayStyle(visible && type === 'wallpaper') }}>
        <Wallpaper />
      </div>
      <div style={{ ...getDisplayStyle(visible && type === 'account') }}>
        <Account />
      </div>
    </>
  );
}

export default SubSetting;
