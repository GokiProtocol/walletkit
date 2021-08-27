import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
  fill?: string;
  frameMs?: number;
}

export const ConnectingAnimation: React.FC<Props> = ({
  fill = "#6764FB",
  frameMs = 160,
}: Props) => {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, frameMs);
    return () => clearInterval(interval);
  }, [frameMs]);

  const frame = useMemo(() => Math.floor(now / frameMs) % 7, [frameMs, now]);

  return (
    <svg
      width="56"
      height="12"
      viewBox="0 0 56 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        circle {
          transition: fill 0.4s ease;
        }
      `}
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={frame === 0 ? fill : "#dedede"} />
      <circle
        cx="19.5"
        cy="2.5"
        r="2.5"
        fill={frame === 2 ? fill : "#DEDEDE"}
      />
      <circle
        cx="36.5"
        cy="2.5"
        r="2.5"
        fill={frame === 4 ? fill : "#DEDEDE"}
      />
      <circle
        cx="53.5"
        cy="2.5"
        r="2.5"
        fill={frame === 6 ? fill : "#dedede"}
      />

      <circle
        cx="12.5"
        cy="9.5"
        r="2.5"
        fill={frame === 1 ? fill : "#dedede"}
      />
      <circle
        cx="29.5"
        cy="9.5"
        r="2.5"
        fill={frame === 3 ? fill : "#dedede"}
      />
      <circle
        cx="46.5"
        cy="9.5"
        r="2.5"
        fill={frame === 5 ? fill : "#dedede"}
      />
    </svg>
  );
};
