import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';

function Results({ data }) {
  return (
    <div className="overflow-x-none bg-white h-full">
      <div className="overflow-x-none">
        <div className="align-middle inline-block min-w-full">
          <div className="">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 select-none">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 pl-9 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Path
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    From
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created at
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
