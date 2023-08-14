import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

/* eslint-disable max-len */
interface Props {
  active: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
}

export default function PlusIcon({ active = false, dimensions }: Props) {
  return (
    <svg
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M5.99971 11.625C5.82254 11.625 5.66719 11.5581 5.53365 11.4244C5.4001 11.2908 5.33333 11.1376 5.33333 10.9648V6.66663H1.03512C0.862389 6.66663 0.709188 6.59976 0.575521 6.46604C0.44184 6.33231 0.375 6.17686 0.375 5.99971C0.375 5.82254 0.44184 5.66719 0.575521 5.53365C0.709188 5.4001 0.862389 5.33333 1.03512 5.33333H5.33333V1.03513C5.33333 0.86239 5.40019 0.709181 5.53392 0.5755C5.66765 0.441834 5.8231 0.375 6.00025 0.375C6.17742 0.375 6.33277 0.441834 6.46631 0.5755C6.59985 0.709181 6.66663 0.86239 6.66663 1.03513V5.33333H10.9648C11.1376 5.33333 11.2908 5.4002 11.4245 5.53392C11.5581 5.66765 11.625 5.8231 11.625 6.00025C11.625 6.17742 11.5581 6.33277 11.4245 6.46631C11.2908 6.59985 11.1376 6.66663 10.9648 6.66663H6.66663V10.9648C6.66663 11.1376 6.59976 11.2908 6.46604 11.4244C6.33231 11.5581 6.17686 11.625 5.99971 11.625Z"
        fill={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
