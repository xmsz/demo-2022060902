import { useState } from 'react';

function BtnCopy({
  text = '复制',
  copyHandler,
}: {
  text?: string;
  copyHandler?: (payload: { onSuccess: () => void }) => void;
}) {
  const [btnText, setBtnText] = useState(text);
  return (
    <button
      className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
      onClick={() => {
        copyHandler?.({
          onSuccess: () => {
            setBtnText('复制成功');
            setTimeout(() => {
              setBtnText(text);
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
