import React from 'react';
import axios from 'axios';

function AttendeesListComponent ({list}) {

    const url = "https://events-admin-api.herokuapp.com/registerAttendance";

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
        .then(resp => console.log(resp))
        .then(window.location.reload(true))
        .catch(err => console.error(err))

        return false;
    }
    
    const totalAttendeesRegistered = list.filter(attendee => {
        return attendee.attendance
    });

    console.log(totalAttendeesRegistered)
    return (
        <>
           { list.length !== 0 ? 
           <>
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10 lg:grid lg:grid-flow-col">
                    <h2 className="text-lg tracking-tight text-morado_abalat sm:text-4xl">Total de invitados {list.length}</h2>
                    <h2 className="text-lg tracking-tight text-morado_abalat sm:text-4xl">Total de asistentes {totalAttendeesRegistered.length}</h2>
                </div>
                <div className="px-4 py-3 text-right sm:px-6 ">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {list.map((attendee) => (
                            <li key={attendee.id}>
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="flex min-w-0 flex-1 items-center">
                                        <div className="min-w-0 flex-1 px-4 md:grid md:gap-4">
                                            <div>
                                                <p className="truncate text-sm text-start font-medium text-gray-900">{attendee.name}</p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">Cedula Profesional: {attendee.professional_code}</p>
                                                { attendee.attendance?
                                                    <p className="mt-2 flex items-center text-sm text-green-500"> Entrada registrada</p> 
                                                    : <p className="mt-2 flex items-center text-sm text-red-500"> Entrada sin registrar</p> 
                                                }
                                            </div>
                                        </div>
                                            {
                                                attendee.attendance? 
                                                null :
                                                <div>
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
                                                </div>
                                            }
                                    </div>
                                </div>
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