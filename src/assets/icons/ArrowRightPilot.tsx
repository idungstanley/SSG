interface ArrowRightPilotInterface {
  active: boolean;
}

export default function ArrowRightPilot({ active }: ArrowRightPilotInterface) {
  return (
    <svg
      className={`transition duration-300 ${active ? 'rotate-90' : ''}`}
      width="3.35"
      height="5.11"
      viewBox="0 0 4 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.90552 5.32687C1.65445 5.57794 1.36439 5.63857 1.03533 5.50877C0.706276 5.37896 0.541748 5.13136 0.541748 4.76597V1.25481C0.541748 0.903308 0.706276 0.662655 1.03533 0.53285C1.36439 0.403044 1.65445 0.463677 1.90552 0.714746L3.64266 2.45191C3.72066 2.5299 3.7813 2.61911 3.82456 2.71954C3.86782 2.81995 3.88946 2.92038 3.88946 3.02081C3.88946 3.12124 3.86782 3.22166 3.82456 3.32208C3.7813 3.42251 3.72066 3.51172 3.64266 3.5897L1.90552 5.32687Z"
        fill={active ? '#424242' : '#919191'}
      />
    </svg>
  );
}
