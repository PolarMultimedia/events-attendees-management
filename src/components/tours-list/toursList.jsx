import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid'

function ToursList ({tours}) {

    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl uppercase">Lista de Giras</h2>
            </div>
            {
                tours.length !== 0 ?
                <div className="px-4 py-3 text-right sm:px-6 ">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {tours.map((tour) => (
                            <li key={tour.name}>
                                <Link to={'/eventos/'+tour.id} className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="flex min-w-0 flex-1 items-center">
                                            <div className="min-w-0 flex-1 px-4 md:grid md:gap-4">
                                                <div>
                                                    <p className="truncate text-sm text-start font-medium text-gray-900">{tour.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div> :
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                    <h3 className="text-xl font-bold tracking-tight text-morado_abalat sm:text-2xl">No hay tours registrados</h3>
                </div>
            }
        </>
    );
};

export default ToursList;