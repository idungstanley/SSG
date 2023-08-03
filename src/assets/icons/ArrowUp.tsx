/* eslint-disable max-len */
import interactions from '../../utils/Constants/IconInteractions';

interface ArrowDownProps {
  active?: boolean;
}

export default function ArrowUp({ active = false }: ArrowDownProps) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_1561_989"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <rect x="20.9282" y="20" width="20" height="20" transform="rotate(-180 20.9282 20)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1561_989)">
        <path
          d="M15.4787 12.3277C15.3302 12.4762 15.1699 12.5505 14.9979 12.5505C14.8259 12.5505 14.6657 12.4762 14.5172 12.3277L11.2479 9.05848L7.97867 12.3277C7.83017 12.4762 7.66992 12.5505 7.49792 12.5505C7.32592 12.5505 7.16567 12.4762 7.01717 12.3277C6.86866 12.1792 6.7944 12.019 6.7944 11.847C6.7944 11.675 6.86866 11.5147 7.01717 11.3662L10.679 7.70435C10.7709 7.61246 10.8636 7.54702 10.9571 7.50804C11.0505 7.46904 11.1475 7.44954 11.2479 7.44954C11.3484 7.44954 11.4453 7.46904 11.5388 7.50804C11.6323 7.54702 11.7249 7.61246 11.8168 7.70435L15.4787 11.3662C15.6272 11.5147 15.7014 11.675 15.7014 11.847C15.7014 12.019 15.6272 12.1792 15.4787 12.3277Z"
          fill={active ? interactions.active : interactions.default}
          fillOpacity="0.7"
        />
      </g>
    </svg>
  );
}
