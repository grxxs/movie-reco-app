"use client";

import CountUp from "react-countup";

export function AscendingNumber({ number }: { number: number }) {
  return (
    <CountUp
      className="text-lg font-bold"
      end={number}
      duration={3}
      separator=" "
    />
  );
}
