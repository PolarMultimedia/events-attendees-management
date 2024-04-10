import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EventsList } from "../components";

function Events() {

    const { tour_id } = useParams();
    const [events, setEvents] = useState([]);
    const [tourName, setTourName] = useState('');
    const url = "https://events-admin-api.herokuapp.com/getEvents/"+tour_id;
    const urlTourName = "https://events-admin-api.herokuapp.com/getTour/"+tour_id;

    useEffect(() => {
        const config = {
            method: 'get',
            url: url,
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
        };
    
        const configTourName = {
            method: 'get',
            url: urlTourName,
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
        };

        axios.request(config)
        .then((data) => data)
        .then(eventos => {
            setEvents(eventos?.data)
        })
        .then(
            axios.request(configTourName)
            .then((data) => data)
            .then(tourData => {
                setTourName(tourData?.data[0].name)
            })
            .catch((error) => console.error(error))
        )
        .catch((error) => console.error(error))
    }, [url, urlTourName])

    return (
        <>
            <div className="text-center px-4 pt-10 pb-10 sm:px-2 lg:px-8 lg:pt-10 lg:pb-6">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl uppercase">Fechas del evento "{tourName}"</h2>
            </div>
            <div className="mt-4 ml-10 flex flex-col lg:flex-row lg:justify-start cols-1 items-center justify-end gap-6">
                <Link
                    to="/tours"
                    className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                >
                    Ir a todos los eventos
                </Link>
                <Link
                    to={"/agregar-evento/"+tour_id}
                    className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                >
                    Nueva fecha
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </Link>
            </div>
            <EventsList events={events} tourName={tourName} />
        </>
    );
}

export default Events;