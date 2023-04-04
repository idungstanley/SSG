import React from 'react';

function DateTimeFormat() {
  return (
    <div className="w-1/4">
      <div className="my-4">
        <h1 className="font-bold">Start of the calendar week</h1>
        <div className="flex justify-between">
          <div className="monday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>Monday</h2>
          </div>
          <div className="sunday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>Sunday</h2>
          </div>
        </div>
      </div>

      <div className="my-4">
        <h1 className="font-bold">Time Format</h1>
        <div className="flex justify-between">
          <div className="monday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>24 hour</h2>
          </div>
          <div className="sunday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>12 hour</h2>
          </div>
        </div>
      </div>

      <div className="my-4">
        <h1 className="font-bold">Date Format</h1>
        <div className="flex justify-between">
          <div className="monday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>mm/dd/yyyy</h2>
          </div>
          <div className="sunday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>dd/mm/yyyy</h2>
          </div>
          <div className="sunday flex">
            <input type="checkbox" className="rounded-lg mx-3 text-green-500 border-green-800" />
            <h2>yyyy/mm/dd</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateTimeFormat;
