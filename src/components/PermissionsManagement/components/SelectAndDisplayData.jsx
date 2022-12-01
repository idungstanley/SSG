import React from 'react';
import { PropTypes } from 'prop-types';
import SelectMenuTeamMembers from '../../selectMenu';
import Columns from './DisplaySelectedData';

function SelectAndDisplayData({
  usersList,
  selectedData,
  setSelectedData,
  columnsData,
  type,
  title,
  children,
}) {
  const users = type === 'user' ? usersList.map((i) => ({
    id: i.id,
    user: i.user.name,
  }));
  return (
    <>
      <SelectMenuTeamMembers
        teamMembers={users}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        type={type}
        title={title}
      />
      {selectedData ? (
        <div className="border border-indigo-400 rounded-xl p-2 mt-2 font-medium">
          <Columns data={columnsData} />
          {children ? (
            <div className="flex flex-col justify-between content-center text-sm mt-3 gap-3">
              {children}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

SelectAndDisplayData.defaultProps = {
  selectedData: null,
  columnsData: null,
  children: null,
};

SelectAndDisplayData.propTypes = {
  usersList: PropTypes.array.isRequired,
  selectedData: PropTypes.object,
  setSelectedData: PropTypes.func.isRequired,
  columnsData: PropTypes.array,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SelectAndDisplayData;
