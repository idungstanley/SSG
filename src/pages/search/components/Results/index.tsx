import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';

interface data {
  id: string
}
interface dataProps {
  data: data[]
}
const Results: React.FC<dataProps> =({ data }) => {
  return (
    <div className="h-full bg-white overflow-x-none">
      <div className="overflow-x-none">
        <div className="inline-block min-w-full align-middle">
          <div className="">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="select-none bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase pl-9"
                  >
                    Path
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    From
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Created at
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Size
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((i) => (
                  <Item key={i.id} data={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

Results.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Results;
