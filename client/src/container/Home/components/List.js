export default function List({ children }) {
  return (
    <>
      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">{children}</ul>
          </div>
        </div>
      </div>
    </>
  );
}
