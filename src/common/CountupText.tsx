import { useCountUp } from "../hooks/useCountUp";

interface CountUpTextProps {
  value: string;
  className?: string;
}

export function CountUpText({ value, className }: CountUpTextProps) {
  // Extract number and suffix from the value
  const match = value.match(/(\d+)(.*)/);
  const number = match ? Number.parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const { count, elementRef } = useCountUp({
    end: number,
    duration: 2500,
    startOnView: true,
  });

  return (
    <h4 ref={elementRef} className={className}>
      {count}
      {suffix}
    </h4>
  );
}
