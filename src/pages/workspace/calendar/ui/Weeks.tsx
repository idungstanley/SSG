const WEEKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Weeks() {
  return (
    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
      {WEEKS.map((week) => (
        <div key={week}>{week}</div>
      ))}
    </div>
  );
}
