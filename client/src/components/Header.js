export default function Heading({ children }) {
  return (
    <>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          {children}
        </div>
      </div>
    </>
  );
}
