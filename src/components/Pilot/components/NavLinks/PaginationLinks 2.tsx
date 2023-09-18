interface Props {
  arr: number[];
}

export default function PaginationLinks({ arr }: Props) {
  return (
    <div>
      {arr.map((link, index) => (
        <ul key={index} className="flex w-full">
          <li className="border border-alsoit-gray-75 text-center text-alsoit-gray-100 cursor-pointer px-2">{link}</li>
        </ul>
      ))}
    </div>
  );
}
