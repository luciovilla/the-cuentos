export default function Loading() {
  return (
    <div className="px-4 h-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      <div className="bg-white space-y-2 p-4 rounded-md shadow-sm">
        <div className="opacity-70 rounded-md bg-gray-400 w-full h-2 animate-pulse"></div>
        <div className="opacity-70 rounded-md bg-gray-400 w-full h-2 animate-pulse"></div>
        <div className="opacity-70 rounded-md bg-gray-400 w-3/4 h-2 animate-pulse"></div>
      </div>
      <div className="bg-white space-y-2 p-4 rounded-md shadow-sm">
        <div className="opacity-70 rounded-md bg-gray-400 w-full h-2 animate-pulse"></div>
        <div className="opacity-70 rounded-md bg-gray-400 w-full h-2 animate-pulse"></div>
        <div className="opacity-70 rounded-md bg-gray-400 w-3/4 h-2 animate-pulse"></div>
      </div>
    </div>
  )
}
