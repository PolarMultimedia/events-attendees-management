import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ToursList from "../components/tours-list/toursList";


function Home(){

    const [tours, setLatest_tours] = useState([]);
    const [total_events, setTotal_events] = useState(0);
    const [total_attendees, setTotal_attendees] = useState(0)
    const [total_tours, setTotal_tours] = useState(0);
    const URL = 'https://events-admin-api.herokuapp.com/getTourTotalEvents';
    const URL_events = 'https://events-admin-api.herokuapp.com/getTotalEvents';
    const URL_attendees = 'https://events-admin-api.herokuapp.com/getTotalAttendees';

    useEffect(() => {
        const config = {
            method: "get",
            url: URL,
            headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            },
        }

        const config_events = {
            method: "get",
            url: URL_events,
            headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            },
        }

        const config_attendees = {
            method: "get",
            url: URL_attendees,
            headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            },
        }

        axios.request(config)
        .then(data => data)
        .then(tours => {
            setLatest_tours(tours?.data)
            setTotal_tours(tours.data.length)
        })
        .then(resp => {
            axios.request(config_events)
            .then(events => {
                setTotal_events(parseInt(events.data.rows[0].count))
            })
            .then(resp => {
                axios.request(config_attendees)
                .then(attendees => {
                    setTotal_attendees(parseInt(attendees.data.rows[0].count))
                })
            })
        })
    },[]);

    const latest_tours = tours.sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    }).slice(0,3)


    return (
        <div className="overflow-hidden">
            <div className="px-6 py-32 sm:px-6 lg:py-16 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="pt-6 lg:pt-8">
                        {   latest_tours.length > 0 ? 
                            <>
                                <h2 className="text-xl lg:text-2xl ">Ultimos eventos</h2>
                                <div className="mt-4 flex flex-col lg:flex-row lg:justify-between cols-1 items-center justify-end gap-6">
                                    <Link
                                        to="/tours"
                                        className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                                    >
                                        Todos los Eventos
                                    </Link>
                                    <Link
                                        to="/agregar-tour"
                                        className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                                    >
                                        Nuevo Evento
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </Link>
                                </div>
                                <ToursList tours={latest_tours} />
                                <div className="flex flex-row">
                                    <h2>Total de eventos registrados: {total_tours}{" "}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex flex-row">
                                    <h2>Total de fechas registradas: {total_events}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex flex-row">
                                    <h2>Total de asistentes registrados: {total_attendees}{" "}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                                </div>
                            </> 
                            : 
                            <>
                                 <h2>No hay eventos registrados</h2>
                                 <Link
                                    to="/agregar-tour"
                                    className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                                >
                                    Nuevo Evento
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;