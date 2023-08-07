export default function Recurring() {
  return (
    <div className="flex flex-col space-y-2 p-2">
      <label htmlFor="recur" className="flex flex-col space-y-1">
        <span className="text-alsoit-text-lg font-bold">Recur</span>
        <select className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md py-0.5">
          <option value="">Weekly</option>
        </select>
        <select className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md py-0.5">
          <option value="">When Complete</option>
        </select>
      </label>
      <div className="px-3 flex flex-col space-y-4">
        <label htmlFor="radio" className="flex space-x-2 items-center">
          <input type="radio" />
          <span className="text-alsoit-text-md font-semibold">Create Task</span>
        </label>
        <label htmlFor="radio" className="flex space-x-2 items-center">
          <input type="radio" />
          <span className="text-alsoit-text-md font-semibold">Recur Forever</span>
        </label>
        <label htmlFor="radio" className="flex space-x-2 items-center">
          <input type="radio" />
          <span className="text-alsoit-text-md font-semibold">Update Status to:</span>
        </label>
      </div>
      <div className="flex justify-end space-x-1">
        <button className="border p-1 rounded-md text-alsoit-text-md font-semibold border-alsoit-danger text-alsoit-danger w-16 h-8">
          Cancel
        </button>
        <button className="border p-1 rounded-md text-alsoit-text-md font-semibold text-white bg-alsoit-success w-16 h-8 border-none">
          Save
        </button>
      </div>
    </div>
  );
}
