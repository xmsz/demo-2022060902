import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import BtnCopy from '../BtnCopy';
import LabelGroup from '../LabelGroup';
import { v1, v3, v4, v5 } from 'uuid';

function UUID() {
  const [activeKey, setActiveKey] = useState('uuid4');
  const [count, setCount] = useState(1);
  const [result, setResult] = useState('');

  const create = useMemoizedFn(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i += 1) {
      let id = '';
      switch (activeKey) {
        case 'uuid1':
          id = v1();
          break;
        case 'uuid3':
          id = v3(v1(), v1());
          break;
        case 'uuid4':
          id = v4();
          break;
        case 'uuid5':
          id = v5(v1(), v1());
          break;
      }
      list.push(id);
    }
    setResult(list.join('\n'));
  });
  return (
    <div
      className="w-full p-3 pt-8 bg-zinc-50"
      style={{
        width: '666px',
      }}
    >
      <div className="relative p-2 pt-7 rounded border border-gray-200 bg-zinc-100">
        <div className="absolute z-10 left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <LabelGroup
            activeKey={activeKey}
            dataSource={[
              { label: 'UUID1', value: 'uuid1' },
              { label: 'UUID3', value: 'uuid3' },
              { label: 'UUID4', value: 'uuid4' },
              { label: 'UUID5', value: 'uuid5' },
            ]}
            onChange={(value) => {
              setActiveKey(value);
            }}
          />
        </div>

        <div className="flex items-center gap-2 m-4 mt-0">
          <div className="text-sm w-20">生成个数：</div>
          <input
            type="number"
            className="text-xs px-1.5 py-1 shadow  outline-none"
            value={count}
            onChange={(e) => {
              setCount(Number(e.target.value));
            }}
          />
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

export default UUID;
