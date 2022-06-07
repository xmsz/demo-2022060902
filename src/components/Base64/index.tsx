import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import BtnCopy from '../BtnCopy';
import LabelGroup from '../LabelGroup';
import CryptoJS from 'crypto-js';

function Base64() {
  const [activeKey, setActiveKey] = useState('text');
  const [inputText, setInputText] = useState('');
  const [outImageUrl, setOutImageUrl] = useState('');
  const [result, setResult] = useState('');

  const encoding = useMemoizedFn(() => {
    const s = CryptoJS.enc.Utf8.parse(inputText);
    const base64 = CryptoJS.enc.Base64.stringify(s);
    setResult(base64);
  });

  const decoding = useMemoizedFn(() => {
    const s = CryptoJS.enc.Base64.parse(inputText);
    const str = s.toString(CryptoJS.enc.Utf8);
    setResult(str);
  });

  return (
    <div className="w-full p-3 pt-8 bg-zinc-50" style={{ width: '560px' }}>
      <div className="relative p-2 pt-7 rounded border border-gray-200 bg-zinc-100">
        <div className="absolute z-10 left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <LabelGroup
            activeKey={activeKey}
            dataSource={[
              { label: '文本', value: 'text' },
              { label: '图片', value: 'image' },
            ]}
            onChange={(value) => {
              setActiveKey(value);
            }}
          />
        </div>

        {activeKey === 'text' && (
          <div>
            <textarea
              rows={6}
              placeholder="请输入要进行 Base64 编码或解码的字符"
              className="px-3 py-2 w-full text-sm outline-none resize-none shadow"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />

            <div className="flex justify-end gap-2 py-2 pb-4">
              <button
                className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
                onClick={() => {
                  setInputText('');
                  setResult('');
                }}
              >
                清空结果
              </button>

              <BtnCopy
                text="复制结果"
                copyHandler={({ onSuccess }) => {
                  navigator.clipboard.writeText(result).then(() => {
                    onSuccess();
                  });
                }}
              />

              <button
                className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
                onClick={encoding}
              >
                编码
              </button>
              <button
                className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
                onClick={decoding}
              >
                解码
              </button>
            </div>

            <textarea
              value={result}
              rows={6}
              readOnly
              placeholder="Base64 编码或解码的结果"
              className="px-3 py-2 w-full text-sm outline-none resize-none shadow"
            />
          </div>
        )}

        {activeKey === 'image' && (
          <div>
            <div className="flex justify-center items-center" style={{ height: '142px' }}>
              {outImageUrl ? (
                <img src={outImageUrl} className="w-28" />
              ) : (
                <div className="relative">
                  <input
                    className="absolute z-10 left-0 top-0 w-full h-full opacity-0"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files);
                      const files = e.target.files as FileList;

                      const reader = new FileReader();
                      reader.readAsDataURL(files[0]);
                      reader.onload = function () {
                        console.log(1111, reader.result);
                        setOutImageUrl(reader.result as string);
                      };
                    }}
                  />
                  <button className="px-2 py-0.5 rounded text-sm bg-white shadow select-none cursor-default">
                    选择图片
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 py-2 pb-4">
              <button
                className="px-2 py-0.5 rounded text-xs bg-white shadow select-none cursor-default"
                onClick={() => {
                  setOutImageUrl('');
                }}
              >
                清空结果
              </button>

              <BtnCopy
                text="复制结果"
                copyHandler={({ onSuccess }) => {
                  navigator.clipboard.writeText(outImageUrl).then(() => {
                    onSuccess();
                  });
                }}
              />
            </div>

            <textarea
              value={outImageUrl}
              rows={6}
              placeholder="Base64 编码或解码的结果"
              className="px-3 py-2 w-full text-sm outline-none resize-none shadow"
              onChange={(e) => {
                setOutImageUrl(e.target.value);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Base64;
