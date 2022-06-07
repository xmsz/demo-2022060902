import { useMemoizedFn } from 'ahooks';
import CryptoJS from 'crypto-js';
import { useState } from 'react';

function MD5() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  const encrypt = useMemoizedFn(() => {
    setResult(CryptoJS.MD5(inputText).toString());
  });

  return (
    <div className="w-full p-3 bg-zinc-50" style={{ width: '560px' }}>
      <div className="p-2 rounded border border-gray-200 bg-zinc-100">
        <textarea
          rows={6}
          placeholder="请输入要进行编码的内容"
          className="px-3 py-2 w-full text-sm outline-none resize-none shadow"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />

        <div className="flex justify-end items-center">
          <button className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default" onClick={encrypt}>
            加密
          </button>
        </div>

        {result && (
          <div className="flex flex-col gap-2">
            {[
              { label: '32位大写', value: result.toLocaleUpperCase() },
              { label: '32位小写', value: result.toLocaleLowerCase() },
              { label: '16位大写', value: result.substring(8, 24).toLocaleUpperCase() },
              { label: '16位小写', value: result.substring(8, 24).toLocaleLowerCase() },
            ].map((item) => {
              return (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-20 text-sm text-black text-opacity-50">{item.label}</div>
                  <div className="text-sm">{item.value}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MD5;
