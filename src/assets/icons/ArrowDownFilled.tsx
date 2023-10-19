import { IconProps } from './IconType';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

function ArrowDownFilled({ active = false, dimensions, color, ...props }: IconProps) {
  return (
    <svg
      {...props}
      width={dimensions?.width ?? '6'}
      height={dimensions?.height ?? '4'}
      viewBox="0 0 5 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.65599 2.72666L0.223283 1.29397C-0.00106438 1.06961 -0.0563491 0.808927 0.0574287 0.511927C0.171206 0.214913 0.392095 0.0664062 0.720095 0.0664062H3.63837C3.95246 0.0664062 4.16641 0.214913 4.2802 0.511927C4.39398 0.808927 4.33869 1.06961 4.11432 1.29397L2.68164 2.72666C2.60898 2.79931 2.52778 2.8546 2.43803 2.89253C2.3483 2.93046 2.25855 2.94943 2.1688 2.94943C2.07907 2.94943 1.98932 2.93046 1.89957 2.89253C1.80984 2.8546 1.72864 2.79931 1.65599 2.72666Z"
        fill={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}

export default ArrowDownFilled;
