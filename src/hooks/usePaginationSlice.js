import { useMemo } from "react";

const usePaginationSlice = ({ current, amount }) => {
   const arr = useMemo(
      () => Array.from({ length: amount }, (_, i) => i + 1),
      [amount]
   );

   return useMemo(() => {
      if (current <= 1) return arr.slice(0, 3);
      if (current >= arr.length) return arr.slice(-3);

      const start = current <= 2 ? 0 : current - 2;
      const end = current >= arr.length - 1 ? arr.length : current + 1;

      return arr.slice(start, end);
   }, [current, arr]);
};

export default usePaginationSlice;
