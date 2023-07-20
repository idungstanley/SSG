/* eslint-disable max-len */
import interactions from '../../utils/Constants/IconInteractions';

interface ArrowDownProps {
  active?: boolean;
}

export default function ArrowDown({ active = false }: ArrowDownProps) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 6C4.88042 6 4.76472 5.9771 4.65291 5.9313C4.54051 5.8855 4.44694 5.82443 4.3722 5.74809L0.246636 1.53435C0.0822119 1.36641 0 1.15267 0 0.893129C0 0.633587 0.0822119 0.419847 0.246636 0.251908C0.411061 0.0839691 0.620329 0 0.874439 0C1.12855 0 1.33782 0.0839691 1.50224 0.251908L5 3.82443L8.49776 0.251908C8.66218 0.0839691 8.87145 0 9.12556 0C9.37967 0 9.58894 0.0839691 9.75336 0.251908C9.91779 0.419847 10 0.633587 10 0.893129C10 1.15267 9.91779 1.36641 9.75336 1.53435L5.6278 5.74809C5.53812 5.83969 5.44096 5.90443 5.33632 5.94229C5.23169 5.98076 5.11958 6 5 6Z"
        fill={active ? interactions.active : interactions.default}
        fillOpacity="0.7"
      />
    </svg>
  );
}
