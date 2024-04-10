import React, {useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import { RegisterAttendeeForm } from "../components";
import axios from "axios";

function RegisterAttendeePage () {
    const { event_id } = useParams();
    const [eventDate, setEventDate] = useState('');
    const [eventName, setEventName] = useState('');
    const [tourId, setTourId] = useState('');

    const urlEventDate = "https://events-admin-api.herokuapp.com/getEvent/"+event_id;
    const urlEventName = "https://events-admin-api.herokuapp.com/getTour/";
    

    useEffect(() => {
        const configeventDate = {
            method: 'get',
            url: urlEventDate,
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
        };
    
        axios.request(configeventDate)
            .then(data => data)
            .then(res => {
                setEventDate(res.data[0].name);
                setTourId(res.data[0].tour_id);
            })
            .then(() => {
                const configEventName = {
                    method: 'get',
                    url: urlEventName + tourId,
                    headers: { 
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                }

                axios.request(configEventName)
                .then(data => data.data[0])
                .then(tourData => {
                    setEventName(tourData.name);
                })
            })
            .catch(err => console.error(err));
    },[event_id, urlEventDate, tourId, urlEventName])
    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Registrar invitado a "{eventName} { isNaN(new Date(eventDate)) ? eventDate : new Date(eventDate).toLocaleDateString() }"</h2>
            </div>
            <RegisterAttendeeForm event_id={event_id} />
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/invitados/"+event_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Regresar
                </Link>
            </div>
        </>
    )
}

export default RegisterAttendeePage;