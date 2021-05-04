import { parseISO, format } from 'date-fns'

const CuentosList = ({ cuentos }) => {
  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {cuentos.map((cuento) => (
        <div className="bg-white p-4 rounded-md shadow-sm" key={cuento.createdAt}>
          <h3 className="text-md font-bold leading-5">“{cuento.text}”</h3>
          {cuento.name && <p className="text-sm mt-2">– {cuento.name}</p>}
          <p className="text-xs text-gray-500 mt-2">{format(parseISO(cuento.createdAt), 'PP')}</p>
        </div>
      ))}
    </div>
  )
}
export default CuentosList
