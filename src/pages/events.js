import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EventsList } from "../components";

function Events() {

    const { tour_id } = useParams();
    const [events, setEvents] = useState([]);
    const [tourName, setTourName] = useState('');
    const url = "https://events-admin-api.herokuapp.com//getEvents/"+tour_id;
    const urlTourName = "https://events-admin-api.herokuapp.com//getTour/"+tour_id;

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
            <EventsList events={events} tourName={tourName} />
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/agregar-evento/"+tour_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-gray-900 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Agregar Nuevo Evento
                </Link>
            </div>
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/tours"}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Regresar
                </Link>
            </div>
        </>
    );
}

export default Events;