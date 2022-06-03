import { useMemoizedFn, useMount, useTimeout, useUnmount } from 'ahooks';
import { Timeout } from 'ahooks/lib/useRequest/src/types';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

function DateButton() {
  const [date, setDate] = useState(dayjs().format('M月D日 HH:mm'));
  const dateTimer = useRef<Timeout | null>(null);

  const clear = useTimeout(() => {
    setDate(dayjs().format('M月D日 HH:mm'));
  }, 1000);

  const calculateDate = useMemoizedFn(() => {
    dateTimer.current = setTimeout(() => {
      setDate(dayjs().format('M月D日 HH:mm'));
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

export default DateButton;
