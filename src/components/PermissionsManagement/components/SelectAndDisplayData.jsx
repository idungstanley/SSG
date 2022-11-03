import React from 'react';
import { PropTypes } from 'prop-types';
import SelectMenuTeamMembers from '../../selectMenu';
import DisplayData from './DisplaySelectedData';

function SelectAndDisplayData({
  usersList,
  selectedData,
  setSelectedData,
  columnsData,
  type,
  title,
}) {
  return (
    <>
      <SelectMenuTeamMembers teamMembers={usersList} selectedData={selectedData} setSelectedData={setSelectedData} type={type} title={title} />
      {selectedData ? (
        <div className="border rounded-xl p-2 mt-2 font-medium">
          <DisplayData data={columnsData} />
          <div className="flex justify-between content-center text-sm mt-3">
            <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Change access</button>
            <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Remove access</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

SelectAndDisplayData.defaultProps = {
  selectedData: null,
  columnsData: null,
};

SelectAndDisplayData.propTypes = {
  usersList: PropTypes.array.isRequired,
  selectedData: PropTypes.object,
  setSelectedData: PropTypes.func.isRequired,
  columnsData: PropTypes.array,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SelectAndDisplayData;
