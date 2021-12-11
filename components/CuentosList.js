const CuentosList = ({ cuentos }) => {
  return (
    <div className="max-w-5xl center my-32 mx-auto w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {cuentos.map((cuento) => (
          <li key={cuento.id}>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-lg text-gray-700">{cuento.body}</div>
              <div className="flex items-center space-x-4 mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cuento.image}
                  alt=""
                  className="flex-none w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-auto">
                  <div className="text-sm text-gray-500 ">{cuento.created_by}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default CuentosList
