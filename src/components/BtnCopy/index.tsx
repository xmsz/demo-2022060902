import { useState } from 'react';

function BtnCopy({ copyHandler }: { copyHandler?: (payload: { onSuccess: () => void }) => void }) {
  const [btnText, setBtnText] = useState('复制');
  return (
    <button
      className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
      onClick={() => {
        copyHandler?.({
          onSuccess: () => {
            setBtnText('复制成功');
            setTimeout(() => {
              setBtnText('复制');
            }, 1200);
          },
        });
      }}
    >
      {btnText}
    </button>
  );
}

export default BtnCopy;
