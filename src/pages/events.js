import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EventsList } from "../components";

function Events() {

    const { tour_id } = useParams();
    const [events, setEvents] = useState([]);
    const url = "http://localhost:3000/getEvents/"+tour_id;

    const config = {
        method: 'get',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
    };

    useEffect(() => {
        axios.request(config)
        .then((data) => data)
        .then(eventos => {
            setEvents(eventos?.data)
        })
        .catch((error) => console.error(error))
    }, [])

    return (
        <>
            <EventsList events={events} />
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/agregar-evento/"+tour_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-gray-900 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Agregar Nuevo Evento
                </Link>
            </div>
        </>
    );
}

export default Events;