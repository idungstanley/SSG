import TBodyData from './TBody';
import THeadData from './THead';

export default function NotificaitonTable() {
  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
        <THeadData />
      </thead>
      <tbody className="bg-white">
        <TBodyData />
      </tbody>
    </table>
  );
}
