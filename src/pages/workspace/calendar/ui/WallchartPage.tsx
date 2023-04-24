export default function WallchartPage() {
  return (
    <>
      <section className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        {/* action */}
        <div className="hidden md:ml-4 md:flex md:items-center">
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md  bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Add event
          </button>
        </div>
      </section>

      <p>Some info</p>
    </>
  );
}
