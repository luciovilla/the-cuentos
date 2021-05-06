import { parseISO, format } from 'date-fns'
import DeleteCuentoButton from './DeleteCuentoButton'
import EditCuentoModal from './EditCuentoModal'

const CuentosListAdmin = ({ cuentos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {cuentos.map((cuento) => (
        <div className="bg-white p-4" key={cuento.createdAt}>
          <h3 className="text-md font-bold">“{cuento.text}”</h3>
          <p className="text-xs mt-2 text-gray-500">{format(parseISO(cuento.createdAt), 'PPp')}</p>
          <div className="mt-4">
            <EditCuentoModal cuentoText={cuento.text} cuentoId={cuento.id}>
              Edit
            </EditCuentoModal>
            <DeleteCuentoButton cuentoId={cuento.id} />
          </div>
        </div>
      ))}
    </div>
  )
}
export default CuentosListAdmin
