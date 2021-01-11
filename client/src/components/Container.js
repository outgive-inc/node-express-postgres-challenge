export default function Container({ children }) {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg content-center">
            <div className="px-4 py-5 sm:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
