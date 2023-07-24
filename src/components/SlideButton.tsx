interface SlideButtonProps {
  state?: boolean[];
  index: number;
  changeFn: (index: number, target?: string) => void;
  target?: string;
}

export function SlideButton({ state, index, changeFn, target }: SlideButtonProps) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={state?.length ? state[index] : undefined}
        onChange={() => changeFn(index, target)}
      />
      <span className={`slider ${state?.length && state[index] ? 'checked' : ''}`}></span>
    </label>
  );
}
