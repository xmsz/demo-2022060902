import { useEffect, useRef, useState } from 'react';
import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import dayjs from 'dayjs';

import { Button, Input, Select } from 'antd';
import WindowWrapper from '../WindowWrapper';
import { IWindowProvider } from '@/libs/window';

const TIME_UNIT_LIST = [
  {
    value: 's',
    label: '秒(s)',
  },
  {
    value: 'ms',
    label: '毫秒(ms)',
  },
];

const TEXT_FORMAT_LIST = [
  {
    label: '---',
    value: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    label: '///',
    value: 'YYYY/MM/DD HH:mm:ss',
  },
  {
    label: '年月日',
    value: 'YYYY年MM月DD日 HH:mm:ss',
  },
  {
    label: '年月日时分秒',
    value: 'YYYY年MM月DD日 HH时mm分ss秒',
  },
];

function getCurrentTimestamp(unit: string) {
  let result = dayjs().valueOf();
  if (unit === 's') {
    result = dayjs().unix();
  }
  return result;
}

function CurrentTimestamp({
  unit,
  onChange,
}: {
  unit: string;
  onChange: (value: number) => void;
}) {
  const [timestamp, setTimestamp] = useState(dayjs().valueOf());
  const [isRefresh, setRefresh] = useState(true);
  const timer = useRef<number | null>(null);

  const startRefresh = useMemoizedFn(() => {
    const loop = () => {
      setTimestamp(() => getCurrentTimestamp(unit));
      timer.current = setTimeout(() => {
        loop();
      }, 1000);
    };
    loop();
  });

  const stopRefresh = useMemoizedFn(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  });

  const restartRefresh = useMemoizedFn(() => {
    stopRefresh();
    startRefresh();
  });

  useEffect(() => {
    if (isRefresh) {
      restartRefresh();
    }
  }, [unit]);

  useMount(() => {
    setRefresh(() => true);
  });

  useUnmount(() => {
    stopRefresh();
  });

  return (
    <div className="flex items-center">
      <span className="w-60px text-slate-600">现在：</span>
      <div
        className="w-180px text-sky-400 hover:underline cursor-pointer"
        onClick={() => {
          onChange(timestamp);
        }}
      >
        {timestamp}
      </div>
      <div className="flex items-center text-slate-600">
        <span>控制：</span>
        <i />
        <span
          className="hover:cursor-pointer"
          style={{ color: isRefresh ? '#e74c3c' : '#009a61' }}
          onClick={() => {
            (isRefresh ? stopRefresh : startRefresh)();
            setRefresh((preValue) => !preValue);
          }}
        >
          {isRefresh ? '停止' : '开始'}
        </span>
      </div>
    </div>
  );
}

function TimestampToText() {
  const [state, setState] = useState({
    unit: 'ms',
    value: Math.round(new Date().getTime()).toString(),
    result: '',
    format: 'YYYY-MM-DD HH:mm:ss',
  });

  const getDate = useMemoizedFn(() => {
    let sourceTimestamp = Number(state.value);
    switch (state.unit) {
      case 's':
        sourceTimestamp *= 1000;
        break;

      default:
        break;
    }
    const result = dayjs(sourceTimestamp).format(state.format);
    setState((preValue) => ({ ...preValue, result: result }));
  });

  return (
    <>
      <CurrentTimestamp
        unit={state.unit}
        onChange={(currentTimestamp) =>
          setState((preValue) => ({
            ...preValue,
            value: String(currentTimestamp),
          }))
        }
      />
      <div className="flex items-center flex-wrap mt-4">
        <span className="w-60px text-slate-600">时间戳：</span>
        <Input
          style={{ width: '240px' }}
          value={state.value}
          onChange={(e) => {
            setState((preValue) => ({ ...preValue, value: e.target.value }));
          }}
        />
        <Select
          style={{ width: '120px' }}
          options={TIME_UNIT_LIST}
          value={state.unit}
          onChange={(value) =>
            setState((preValue) => ({ ...preValue, unit: value }))
          }
        />

        <Button className="mx-24px" type="primary" onClick={getDate}>
          {'转换>>'}
        </Button>

        <Input style={{ width: '240px' }} value={state.result} readOnly />

        <Select
          style={{ width: '120px' }}
          options={TEXT_FORMAT_LIST}
          value={state.format}
          onChange={(value) =>
            setState((preValue) => ({ ...preValue, format: value }))
          }
        />
      </div>
    </>
  );
}

function TextToTimestamp() {
  const [state, setState] = useState({
    unit: 'ms',
    value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    result: '',
    format: 'YYYY-MM-DD HH:mm:ss',
  });

  const getTimestamp = useMemoizedFn(() => {
    let dateText = '';
    switch (state.format) {
      case 'YYYY-MM-DD HH:mm:ss':
        dateText = state.value;
        break;

      case 'YYYY/MM/DD HH:mm:ss':
        dateText = state.value.replace(/[\/]/g, () => '-');
        break;

      case 'YYYY年MM月DD日 HH:mm:ss':
        dateText = state.value.replace(/[年月日]/g, () => '-');
        break;

      case 'YYYY年MM月DD日 HH时mm分ss秒':
        dateText = state.value.replace(/[年月日时分秒]/g, (c) => {
          if (c === '年' || c === '月') return '-';
          else if (c === '时' || c === '分') return ':';
          else return '';
        });
        break;

      default:
        break;
    }

    const targetDate = dayjs(dateText);
    let result = 0;
    switch (state.unit) {
      case 'ms':
        result = targetDate.valueOf();
        break;

      case 's':
        result = targetDate.unix();
        break;

      default:
        break;
    }

    setState((preValue) => ({ ...preValue, result: result.toString() }));
  });

  return (
    <div className="flex items-center flex-wrap mt-1em">
      <span className="w-60px text-slate-600">时间：</span>
      <Input
        style={{ width: '240px' }}
        value={state.value}
        onChange={(e) => {
          setState((preValue) => ({ ...preValue, value: e.target.value }));
        }}
      />

      <Select
        style={{ width: '120px' }}
        options={TEXT_FORMAT_LIST}
        value={state.format}
        onChange={(value) =>
          setState((preValue) => ({ ...preValue, format: value }))
        }
      />

      <Button className="mx-24px" type="primary" onClick={getTimestamp}>
        {'转换>>'}
      </Button>

      <Input style={{ width: '240px' }} value={state.result} readOnly />
      <Select
        style={{ width: '120px' }}
        options={TIME_UNIT_LIST}
        value={state.unit}
        onChange={(value) =>
          setState((preValue) => ({ ...preValue, unit: value }))
        }
      />
    </div>
  );
}

function Timestamp(payload: IWindowProvider) {
  return (
    <WindowWrapper {...payload} style={{ width: '960px' }}>
      <div className="p-4">
        <TimestampToText />
        <TextToTimestamp />
      </div>
    </WindowWrapper>
  );
}

export default Timestamp;
