interface DetailsProps {
  config: { key: string; value: string }[];
}

export default function DetailsSection({ config }: DetailsProps) {
  return (
    <div className="flex flex-col text-sm font-medium border-b divide-y divide-gray-200">
      {config.map((item) => (
        <div key={item.key} className="flex justify-between py-3">
          <p className="text-gray-500">{item.key}</p>
          <span className="text-gray-700">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
