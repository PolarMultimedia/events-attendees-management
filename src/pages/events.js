import React, { useState, useEffect } from "react";
import axios from "axios";
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

        <EventsList events={events} />
    );
}

export default Events;