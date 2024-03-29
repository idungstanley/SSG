import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active?: boolean;
  color?: string;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function ArrowRight({ active, dimensions, color }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '6'}
      height={dimensions?.height ?? '10'}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.352654 9.23115C0.20414 9.08265 0.129883 8.9224 0.129883 8.7504C0.129883 8.5784 0.20414 8.41815 0.352654 8.26965L3.62188 5.0004L0.352654 1.73115C0.20414 1.58265 0.129883 1.4224 0.129883 1.2504C0.129883 1.0784 0.20414 0.918146 0.352654 0.769646C0.501154 0.621132 0.661404 0.546875 0.833404 0.546875C1.0054 0.546875 1.16565 0.621132 1.31415 0.769646L4.97601 4.4315C5.0679 4.52337 5.13333 4.61606 5.17232 4.70954C5.21132 4.80301 5.23082 4.89997 5.23082 5.0004C5.23082 5.10083 5.21132 5.19778 5.17232 5.29125C5.13333 5.38474 5.0679 5.47742 4.97601 5.56929L1.31415 9.23115C1.16565 9.37966 1.0054 9.45392 0.833404 9.45392C0.661404 9.45392 0.501154 9.37966 0.352654 9.23115Z"
        fill={color ? color : active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
