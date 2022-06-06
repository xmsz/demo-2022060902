import { useMemoizedFn } from 'ahooks';
import { nanoid, customAlphabet } from 'nanoid';
import { useState } from 'react';
import BtnCopy from '../BtnCopy';

function NanoId() {
  const [config, setConfig] = useState({
    alphabet: '',
    size: 21,
    count: 1,
  });
  const [alphabetEdit, setAlphabetEdit] = useState(false);
  const [result, setResult] = useState('');

  const create = useMemoizedFn(() => {
    const list: string[] = [];
    for (let i = 0; i < config.count; i += 1) {
      const id = config.alphabet ? customAlphabet(config.alphabet, config.size)() : nanoid(config.size);
      list.push(id);
    }
    setResult(list.join('\n'));
  });

  return (
    <div
      className=""
      style={{
        width: '500px',
      }}
    >
      <div className="flex flex-col gap-3 p-4 border-b border-gray-300 bg-gray-50">
        <div className="flex items-center gap-3">
          <b className="text-sm w-20">字母表：</b>
          <div className="flex-grow flex justify-between items-center h-6">
            {alphabetEdit ? (
              <input
                value={config.alphabet}
                className="flex-grow px-1.5 py-0.5 text-sm outline-none"
                onInput={(e) => {
                  setConfig((pre) => ({ ...pre, alphabet: e.target?.value }));
                }}
              />
            ) : (
              <div className="flex-grow text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                {config.alphabet || '默认'}
              </div>
            )}
            <button
              className="flex-shrink-0 ml-2 px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
              onClick={() => {
                setAlphabetEdit((pre) => !pre);
              }}
            >
              {alphabetEdit ? '保存' : '修改'}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <b className="text-sm w-20">生成长度：</b>
          <input
            type="number"
            value={config.size}
            className="text-xs px-1.5 py-1 w-12 outline-none"
            onInput={(e) => {
              setConfig((pre) => ({ ...pre, size: Number(e.target?.value) }));
            }}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <b className="text-sm w-20">生成个数：</b>
          <input
            type="number"
            value={config.count}
            className="text-xs px-1.5 py-1 w-12 outline-none"
            onInput={(e) => {
              setConfig((pre) => ({ ...pre, count: Number(e.target?.value) }));
            }}
          />
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <textarea
          value={result}
          readOnly
          className="flex-grow py-1.5 px-3 w-full text-sm rounded outline-none"
          rows={4}
          style={{ resize: 'none' }}
        />

        <div className="flex justify-end gap-2 py-2">
          <BtnCopy
            copyHandler={({ onSuccess }) => {
              navigator.clipboard.writeText(result).then(() => {
                onSuccess();
              });
            }}
          />

          <button className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default" onClick={create}>
            生成
          </button>
        </div>
      </div>
    </div>
  );
}

export default NanoId;
