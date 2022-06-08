import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { Timeout } from 'ahooks/lib/useRequest/src/types';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const weekText = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const today = dayjs();
const todayText = `${today.format('M月D日')} ${weekText[today.day()]}`;

function DateText() {
  const [date, setDate] = useState(dayjs().format(`[${todayText}] HH:mm`));
  const dateTimer = useRef<Timeout | null>(null);

  const calculateDate = useMemoizedFn(() => {
    dateTimer.current = setTimeout(() => {
      setDate(dayjs().format(`[${todayText}] HH:mm`));
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
    <button className="px-4 py-1 rounded">
      <p className="text-sm text-white">{date}</p>
    </button>
  );
}

export default DateText;
