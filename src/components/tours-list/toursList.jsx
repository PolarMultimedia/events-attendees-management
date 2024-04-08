import { Link } from 'react-router-dom';

function ToursList ({tours}) {

    return (
        <>
            {
                tours.length !== 0 ?
                <div className='p-8'>
                    <div className="flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Evento
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Total de Fechas
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Ver Fechas</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {tours.map((tour) => (
                                    <tr key={tour.id}>
                                        <td className="py-4 pl-6 pr-3 text-sm font-medium text-left text-gray-900 md:pl-4">
                                            {tour.name}
                                        </td>
                                        <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 md:pl-4">
                                            {tour.count}
                                        </td>
                                        <td className="relative py-4 pl-3 pr-6 text-right text-sm font-medium md:pr-4">
                                            <Link to={'/eventos/'+tour.id} className="text-highlight hover:text-white border border-color-highlight rounded-md px-4 py-2 hover:bg-contrast/70">
                                                Ver fechas<span className="sr-only">, {tour.name}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div> 
                </div>
                :
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                    <h3 className="text-xl font-bold tracking-tight text-morado_abalat sm:text-2xl">No hay Eventos registrados</h3>
                </div>
            }
        </>
    );
};

export default ToursList;