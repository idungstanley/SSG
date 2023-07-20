import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function ArrowCaretUp({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '7'}
      height={dimensions?.height ?? '6'}
      viewBox="0 0 7 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.03109 0.75C3.22354 0.416666 3.70466 0.416667 3.89711 0.75L6.9282 6H0L3.03109 0.75Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
