export default function Table() {
  return (
    <div className="flex flex-col -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-6">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-6">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Capability
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Guest
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Low
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  High
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Admin
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="bg-white"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
