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
    <div className="p-3 bg-zinc-50" style={{ width: '560px' }}>
      <div className="p-2 rounded bg-zinc-100 border border-gray-200">
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="text-sm w-20">字母表：</div>
            <div className="flex-grow flex justify-between items-center h-6">
              {alphabetEdit ? (
                <input
                  value={config.alphabet}
                  className="flex-grow px-1.5 py-0.5 text-sm shadow outline-none"
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
            <div className="text-sm w-20">生成长度：</div>
            <input
              type="number"
              value={config.size}
              className="text-xs px-1.5 py-1 shadow outline-none"
              onInput={(e) => {
                setConfig((pre) => ({ ...pre, size: Number(e.target?.value) }));
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm w-20">生成个数：</div>
            <input
              type="number"
              value={config.count}
              className="text-xs px-1.5 py-1 shadow outline-none"
              onInput={(e) => {
                setConfig((pre) => ({ ...pre, count: Number(e.target?.value) }));
              }}
            />
          </div>
        </div>
        <div className="px-4">
          <textarea
            value={result}
            readOnly
            className="flex-grow py-1.5 px-3 w-full text-sm shadow outline-none"
            rows={8}
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
    </div>
  );
}

export default NanoId;
