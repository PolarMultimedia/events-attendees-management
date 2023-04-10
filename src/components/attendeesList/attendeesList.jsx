import React from 'react';
import { Link } from 'react-router-dom';

function AttendeesListComponent ({list, eventId}) {
    return (
        <>
           { list.length !== 0 ? 
           <>
            <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                    <Link
                        to={"/escanear/"+eventId}
                        className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-amber-400 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                    >
                        Escanear QR
                    </Link>
                </div>
                <div className="px-4 py-3 text-right sm:px-6 ">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {list.map((attendee) => (
                            <li key={attendee.id}>
                                <Link to={'/invitado/'+attendee.id} className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="flex min-w-0 flex-1 items-center">
                                            <div className="min-w-0 flex-1 px-4 md:grid md:gap-4">
                                                <div>
                                                    <p className="truncate text-sm text-start font-medium text-gray-900">{attendee.name} {attendee.lastname}</p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500">Cedula Profesional: {attendee.professional_code}</p>
                                                    { attendee.attendance?
                                                        <p className="mt-2 flex items-center text-sm text-green-500"> Entrada registrada</p> 
                                                        : <p className="mt-2 flex items-center text-sm text-red-500"> Entrada sin registrar</p> 
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>    : 
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                    <h3 className="text-xl font-bold tracking-tight text-morado_abalat sm:text-2xl">No hay invitados registrados</h3>
                </div>
           } 
            
        </>
    );
}

export default AttendeesListComponent;