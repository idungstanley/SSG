import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

interface Props {
  active: boolean;
}

export default function PilotEfficiencyIcon({ active = false }: Props) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.38677 8.86127C6.08439 8.94952 5.79266 9.07086 5.51689 9.22307L5.61696 10.9666L3.86181 10.8743C3.70959 11.15 3.58826
        11.4418 3.5 11.7441L4.79712 12.9181L3.5 14.0728C3.58687 14.3756 3.70827 14.6675 3.86181 14.9426L5.61696 14.8733L5.52843
        16.6208C5.80432 16.7718 6.09605 16.8918 6.39831 16.9787L7.57226 15.6816L8.72697 16.9787C9.02972 16.8932 9.3216 16.7731 9.59685
        16.6208L9.50832 14.8733L11.2558 14.9619C11.4081 14.6866 11.5282 14.3947 11.6137 14.092L10.3166 12.9373L11.6137 11.7634C11.5294
        11.4547 11.4106 11.1564 11.2596 10.8743L9.51217 10.9628L9.6007 9.21922C9.32556 9.06569 9.03369 8.94429 8.73082 8.85742L7.57611 10.1545L6.38677 8.86127Z"
        stroke="#424242"
        strokeWidth="0.739006"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.56083 14.4461C8.40263 14.4461 9.08505 13.7637 9.08505 12.9219C9.08505 12.0801 8.40263 11.3977 7.56083 11.3977C6.71903 11.3977 6.03662 12.0801 6.03662 12.9219C6.03662 13.7637 6.71903 14.4461 7.56083 14.4461Z"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.739006"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2808 4C12.9771 4.08637 12.6841 4.20643 12.4071 4.35795L12.4995 6.10538L10.752 6.01685C10.5997 6.29209 10.4796 6.58397
        10.394 6.88671L11.6873 8.0414L10.394 9.21533C10.4796 9.5242 10.5997 9.82245 10.752 10.1044L12.4995 10.0159L12.4071 11.7595C12.6839
        11.9123 12.977 12.0337 13.2808 12.1213L14.4355 10.8242L15.5902 12.1213C15.8926 12.033 16.1843 11.9117 16.4601 11.7595L16.3947
        10.0121L18.1383 10.1006C18.2905 9.82482 18.4118 9.5331 18.5001 9.23073L17.203 8.0568L18.5001 6.90211C18.4132 6.59925 18.2918 6.30738
        18.1383 6.03225L16.3947 6.10538L16.4832 4.35795C16.2111 4.20748 15.9232 4.08744 15.6249 4L14.4702 5.2971L13.2808 4Z"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.739006"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4505 9.58084C15.2923 9.58084 15.9747 8.89844 15.9747 8.05666C15.9747 7.21487 15.2923 6.53247 14.4505 6.53247C13.6087 6.53247 12.9263 7.21487 12.9263 8.05666C12.9263 8.89844 13.6087 9.58084 14.4505 9.58084Z"
        stroke={active ? ICONS_INTERACTIONS.active : ICONS_INTERACTIONS.default}
        strokeWidth="0.739006"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}