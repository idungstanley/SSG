interface SlideButtonProps {
  state: boolean[];
  index: number;
  changeFn: (index: number) => void;
}

export function SlideButton({ state, index, changeFn }: SlideButtonProps) {
  return (
    <label className="switch">
      <input type="checkbox" checked={state[index]} onChange={() => changeFn(index)} />
      <span className={`slider ${state[index] ? 'checked' : ''}`}></span>
    </label>
  );
}
