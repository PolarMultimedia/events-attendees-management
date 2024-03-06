import React from 'react';
import axios from 'axios';

function AttendeesListComponent ({list}) {

    const url = "http://localhost:3000/registerAttendance";

    const registerAttendance = async(attendant_id) => {
        
        axios.request(url,{
            method: 'post',
            url: url,
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            data: JSON.stringify({
                "user_id": ""+attendant_id
            })
        })
        .then(response => response)
        .then(res => res.data[0])
        .catch(err => console.error(err))

        return false;
    }
    
    const totalAttendeesRegistered = list.filter(attendee => {
        return attendee.attendance
    });

    return (
        <>
           { list.length !== 0 ? 
           <>
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10 lg:grid lg:grid-flow-col">
                    <h2 className="text-4xl tracking-tight text-morado_abalat md:text-md">Total de invitados {list.length}</h2>
                    <h2 className="text-4xl tracking-tight text-morado_abalat md:text-md">Total de asistentes {totalAttendeesRegistered.length}</h2>
                </div>
                <div className='pb-8 px-8 pt-2'>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Nombre
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Identificador
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Asistencia
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Registrar asistencia</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {list.sort((a,b) => b.attendance - a.attendance).map((attendee) => (
                                    <tr key={attendee.id}>
                                        <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 md:pl-4">
                                            {attendee.name}
                                        </td>
                                        <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 md:pl-4">
                                            {attendee.professional_code}
                                        </td>
                                        {
                                            !attendee.attendance ?
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 md:pl-4">
                                                Asistencia sin registrar
                                            </td>
                                            :
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-green-700 md:pl-4">
                                                Asistencia registrada
                                            </td> 

                                        }
                                        {
                                            !attendee.attendance ? 
                                            <td className="relative py-4 pl-3 pr-6 text-right text-sm font-medium md:pr-4">
                                                 <button 
                                                    className="
                                                    rounded-full bg-indigo-600 
                                                    px-4 py-2.5 
                                                    text-sm font-semibold 
                                                    text-white shadow-sm 
                                                    hover:bg-indigo-500 
                                                    focus-visible:outline 
                                                    focus-visible:outline-2 
                                                    focus-visible:outline-offset-2 
                                                    focus-visible:outline-indigo-600"
                                                    type='button'
                                                    onClick={() => registerAttendance(attendee.id)}
                                                    >Registrar asistencia</button>
                                            </td>
                                            :
                                            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 md:pl-4">
                                            </td> 
                                        }
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div> 
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                        <p className="mt-2 text-sm text-gray-700">
                            El identificador depende del cliente y el tipo del evento, por lo general es la cédula profesional.
                        </p>
                        </div>
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