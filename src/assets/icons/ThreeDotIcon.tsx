import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function ThreeDotIcon({ active, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '12'}
      height={dimensions?.height ?? '4'}
      viewBox="0 0 12 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M1.68825 3.08459C1.38913 3.08459 1.13453 2.97809 0.924458 2.76507C0.714403 2.55206 0.609375 2.29599 0.609375 1.99687C0.609375 1.69774 0.715882 1.44314 0.928896 1.23307C1.14191 1.023 1.39798 0.917969 1.6971 0.917969C1.99623 0.917969 2.25082 1.02448 2.46088 1.23749C2.67094 1.4505 2.77598 1.70657 2.77598 2.0057C2.77598 2.30482 2.66947 2.55942 2.45646 2.76949C2.24344 2.97956 1.98738 3.08459 1.68825 3.08459ZM5.99594 3.08459C5.69681 3.08459 5.44222 2.97809 5.23215 2.76507C5.02208 2.55206 4.91704 2.29599 4.91704 1.99687C4.91704 1.69774 5.02355 1.44314 5.23656 1.23307C5.44958 1.023 5.70565 0.917969 6.00477 0.917969C6.3039 0.917969 6.55849 1.02448 6.76856 1.23749C6.97863 1.4505 7.08367 1.70657 7.08367 2.0057C7.08367 2.30482 6.97716 2.55942 6.76415 2.76949C6.55113 2.97956 6.29506 3.08459 5.99594 3.08459ZM10.3036 3.08459C10.0045 3.08459 9.74989 2.97809 9.53983 2.76507C9.32976 2.55206 9.22473 2.29599 9.22473 1.99687C9.22473 1.69774 9.33124 1.44314 9.54425 1.23307C9.75726 1.023 10.0133 0.917969 10.3125 0.917969C10.6116 0.917969 10.8662 1.02448 11.0763 1.23749C11.2863 1.4505 11.3913 1.70657 11.3913 2.0057C11.3913 2.30482 11.2848 2.55942 11.0718 2.76949C10.8588 2.97956 10.6027 3.08459 10.3036 3.08459Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
