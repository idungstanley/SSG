import LeaveTypesTable from '../ui/LeaveTypesTable/LeaveTypesTable';

export default function LeaveTypesPage() {
  return (
    <div className="w-full h-full p-4">
      <div className="mx-auto max-w-5xl">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Leave types</h1>
          <p className="mt-2 text-sm text-gray-700">Create different categories for different days off.</p>
        </div>

        <LeaveTypesTable />
      </div>
    </div>
  );
}
