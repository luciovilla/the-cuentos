import { parseISO, format } from 'date-fns'
import DeleteCuentoButton from './DeleteCuentoButton'
import EditCuentoModal from './EditCuentoModal'

const CuentosList = ({ cuentos, simple, admin }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {cuentos.map((cuento) => (
        <div className="bg-white p-4 rounded-md shadow-sm" key={cuento.createdAt}>
          <h3 className="text-sm text-gray-800 font-medium">“{cuento.text}”</h3>
          {!simple && (
            <>
              {/* {cuento.name && !admin && <p className="text-sm mt-2">– {cuento.name}</p>} */}
              <p className="text-xs text-gray-500 mt-2">
                {format(parseISO(cuento.createdAt), 'PP')}
              </p>
            </>
          )}
          {admin && (
            <div className="mt-4">
              <EditCuentoModal cuentoText={cuento.text} cuentoId={cuento.id}>
                Edit
              </EditCuentoModal>
              <DeleteCuentoButton cuentoId={cuento.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
export default CuentosList
