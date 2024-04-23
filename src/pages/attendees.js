import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { CSVLink } from "react-csv";
import {
    AttendeesListComponent,
    SearchBox,
    AttendeesImporter,
} from "../components";

const headers = [
    { label: "Nombre", key: "name" },
    { label: "Cedula profesional", key: "professional_code" },
    { label: "Asistencia", key: "attendance" },
    { label: "Codigo de acceso", key: "code" },
    { label: "Fecha y hora de entrada", key:"date"},
    { label: "Estado de confirmación", key: "confirmation_status"}
]

function Attendees() {

    const { event_id } = useParams();
    const [list, setList] = useState([]);
    const [eventCity, setEventCity] = useState('');
    const [tourName, setTourName] = useState('');
    const [importing, setImporting] = useState(false);
    const [tourId, setTourId] = useState('');
    const [searchField, setSearchField] = useState('');
    const url = "https://events-admin-api.herokuapp.com/getAttendees/"+event_id;
    const urlEventCity = "https://events-admin-api.herokuapp.com/getEvent/"+event_id;
    const urlTourName = "https://events-admin-api.herokuapp.com/getTour/";
    const reportList = [];

    const onSearchChange = (e) => {
        setSearchField(e.target.value.toLowerCase());
    }

    list.forEach(attendee => {
        reportList.push({
            name: attendee.name,
            professional_code: attendee.professional_code,
            attendance: attendee.attendance? "Asistencia" : "Sin asistencia",
            code: attendee.code,
            date: attendee.updated_at? new Date(attendee.updated_at).toLocaleString('es-MX') : 'Sin registro de asistencia',
            confirmation_status: attendee.confirmation_status
        })
    })

    const csvReport = {
        data: reportList,
        headers: headers,
        filename: 'Reporte Asistencia al evento'+eventCity+'.csv'
    }

    const filteredList = list.filter(attendee => {
        return attendee.name.toLowerCase().includes(searchField);
    });

    useEffect(() => {
        const config = {
            method: 'get',
            url: url,
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
        };

        const configEventCity = {
            method: 'get',
            url: urlEventCity,
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
        };
        axios.request(config)
        .then((data) => data)
        .then(attendees => {
            setList(attendees?.data)
        })
        .then(
            axios.request(configEventCity)
            .then(data => data)
            .then(res => {
                setTourId(res.data[0].tour_id);
                setEventCity(res.data[0].name);
            })
            .then(data => {
                const configTour = {
                    method: 'get',
                    url: urlTourName + tourId,
                    headers: { 
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                    }
                }

                axios.request(configTour)
                .then(data => data.data[0])
                .then(tourData => {
                    setTourName(tourData.name);
                })
                .catch(err => console.error(err));
            })
            .catch((error) => console.error(error))
        )
        .catch((error) => console.error(error))
    }, [url, urlEventCity, urlTourName, tourId]);

    const totalAttendeesRegistered = list.filter(attendee => {
        return attendee.attendance
    });

    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Lista de Invitados a  "{tourName} { isNaN(new Date(eventCity)) ? eventCity : new Date(eventCity).toLocaleDateString("es-MX", {month: "long", day: "2-digit"}) }"</h2>
            </div>
            {
                importing ? 
                <AttendeesImporter event_id={event_id} setImporting={setImporting}/>
                : 
                <>
                    <div className="flex flex-row gap-4 px-12 justify-end">
                    <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                        <button 
                            type="button"
                            className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                            onClick={() => setImporting(true)}
                        >
                            Importar Invitados&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </button>
                        {
                            list.length !== 0 ?
                                <CSVLink
                                    {...csvReport}
                                    className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                                >
                                    Descargar reporte &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </CSVLink>
                            : null
                        }
                        <Link
                            to={"/eventos/"+tourId}
                            className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                        >
                            Volver a fechas&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </Link>
                    </div>

                </div>
                <div className="pb-8 px-8 pt-2">
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-6 lg:pb-6 lg:flex lg:flex-row justify-between items-center">
                            <div className='text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-6 lg:pb-6 lg:flex lg:flex-row items-center'>
                                <SearchBox searchChange={onSearchChange} />
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-center items-center">
                                        <h2 className="text-2xl tracking-tight text-morado_abalat md:text-md">Total de invitados {list.length}</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="flex flex-row justify-center items-center">
                                        <h2 className="text-2xl tracking-tight text-morado_abalat md:text-md">Total de asistentes {totalAttendeesRegistered.length}</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <Link
                                    to={"/escanear/"+event_id}
                                    className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-8 md:px-4 md:text-md"
                                >
                                    Escanear QR&nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                    </svg>

                                </Link>
                                <Link
                                    to={"/agregar-invitado/"+event_id}
                                    className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-8 md:px-4 md:text-md"
                                >
                                    Agregar Asistente&nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    <AttendeesListComponent list={filteredList} />
                </div>
                </>
            }
            
        </>
    );
}

export default Attendees;