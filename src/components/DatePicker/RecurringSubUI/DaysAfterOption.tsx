export function DaysAfterOption() {
  return (
    <div className="flex space-x-1.5 py-1.5 items-center">
      <input
        type="number"
        className="no-control-num-input w-10 px-1.5 py-0.5 rounded-md border-alsoit-gray-75 border"
      />
      <span className="text-alsoit-text-md font-semibold">day(s) after completion</span>
    </div>
  );
}
