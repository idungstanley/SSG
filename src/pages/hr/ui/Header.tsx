import { useAppSelector } from '../../../app/hooks';

export default function Header() {
  const { activeItemName } = useAppSelector((state) => state.workspace);

  return (
    <section className="px-4 flex justify-between items-center border-b border-gray-200 w-full p-5">
      {activeItemName}
    </section>
  );
}
