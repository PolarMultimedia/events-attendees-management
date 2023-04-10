import React from 'react';
import { Link } from 'react-router-dom';

function AttendeesListComponent ({list}) {
    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl uppercase">Lista de Invitados</h2>
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
                                                <p className="mt-2 flex items-center text-sm text-gray-500">Asistencia: {attendee.attendance? "Entrada registrada" : "Entrada sin registrar"}</p>
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
        </>
    );
}

export default AttendeesListComponent;