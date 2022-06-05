import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { Timeout } from 'ahooks/lib/useRequest/src/types';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import Selector from '../Selector';

function Timestamp() {
  const [timestamp, setTimestamp] = useState(dayjs().valueOf());
  const [inputDate, setInputDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const [toDateFormat, setToDateFormat] = useState('YYYY-MM-DD HH:mm:ss');
  const [dateCopySuccess, setDateResultCopySuccess] = useState(false);

  const [inputTimestamp, setInputstamp] = useState(dayjs().valueOf());
  const [toTimestampUnit, setToTimestampUnit] = useState('ms');
  const [timestampResultCopySuccess, setTimestampResultCopySuccess] = useState(false);
  const dateTimer = useRef<Timeout | null>(null);

  const timestampResult = useMemo(
    () => dayjs(Number(inputTimestamp)).format(toDateFormat),
    [inputTimestamp, toDateFormat],
  );

  const dateResult = useMemo(() => {
    const dayjsInst = dayjs(inputDate);
    switch (toTimestampUnit) {
      case 'ms':
        return dayjsInst.valueOf();
      case 's':
        return dayjsInst.unix();
      default:
        return dayjsInst.valueOf();
    }
  }, [inputDate, toTimestampUnit]);

  const calculateDate = useMemoizedFn(() => {
    dateTimer.current = setTimeout(() => {
      setTimestamp(dayjs().valueOf());
      calculateDate();
    }, 1000);
  });

  useMount(() => {
    calculateDate();
  });

  useUnmount(() => {
    if (dateTimer.current) {
      clearTimeout(dateTimer.current);
    }
  });

  return (
    <div className="" style={{ width: '500px' }}>
      <div className="flex items-center p-4 border-b border-gray-300 bg-gray-100">
        <div className="w-20 text-sm text-black text-opacity-50">当前时间：</div>
        <div
          className="text-sm text-black hover:underline cursor-pointer"
          onClick={() => {
            setInputstamp(timestamp);
          }}
        >
          {dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>

      <div className="p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center">
          <div className="w-20 text-sm text-black text-opacity-50">时间戳：</div>
          <input
            className="px-1 border border-gray-200 rounded text-sm"
            value={inputTimestamp}
            onInput={(e) => {
              setInputstamp(e.target?.value || '');
            }}
          />

          <Selector
            className="ml-2"
            value={toDateFormat}
            dataSource={[
              { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
              { label: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' },
              { label: 'YYYY/MM/DD HH:mm:ss', value: 'YYYY/MM/DD HH:mm:ss' },
              { label: 'YYYY/MM/DD HH:mm', value: 'YYYY/MM/DD HH:mm' },
              { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
              { label: 'HH:mm:ss', value: 'HH:mm:ss' },
            ]}
            onSelect={(value: string) => {
              setToDateFormat(value);
            }}
          />
        </div>

        <div className="flex items-center gap-2 pl-20 py-2">
          <div className="text-sm select-none" style={{ width: '166px' }}>
            {timestampResult}
          </div>
          <div
            className="px-2 py-1 text-xs text-white rounded bg-blue-500 select-none cursor-default"
            onClick={() => {
              navigator.clipboard.writeText(timestampResult).then(() => {
                setTimestampResultCopySuccess(true);
                setTimeout(() => {
                  setTimestampResultCopySuccess(false);
                }, 2000);
              });
            }}
          >
            复制
          </div>
          {timestampResultCopySuccess && <div className="text-xs text-blue-500">复制成功</div>}
        </div>
      </div>

      <div className="p-4 bg-gray-100">
        <div className="flex items-center ">
          <div className="w-20 text-sm text-black text-opacity-50">时间：</div>
          <input
            className="px-1 border border-gray-200 rounded text-sm"
            value={inputDate}
            onInput={(e) => {
              setInputDate(e.target?.value || '');
            }}
          />

          <Selector
            className="ml-2"
            value={toTimestampUnit}
            dataSource={[
              { label: '毫秒', value: 'ms' },
              { label: '秒', value: 's' },
            ]}
            onSelect={(value: string) => {
              setToTimestampUnit(value);
            }}
          />
        </div>

        <div className="flex items-center gap-2 pl-20 py-2">
          <div className="text-sm select-none" style={{ width: '166px' }}>
            {dateResult}
          </div>
          <div
            className="px-2 py-1 text-xs text-white rounded bg-blue-500 select-none cursor-default"
            onClick={() => {
              navigator.clipboard.writeText(String(dateResult)).then(() => {
                setDateResultCopySuccess(true);
                setTimeout(() => {
                  setDateResultCopySuccess(false);
                }, 2000);
              });
            }}
          >
            复制
          </div>
          {dateCopySuccess && <div className="text-xs text-blue-500">复制成功</div>}
        </div>
      </div>
    </div>
  );
}

export default Timestamp;
