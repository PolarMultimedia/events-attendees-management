import React, {useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import { RegisterAttendeeForm } from "../components";
import axios from "axios";

function RegisterAttendeePage () {
    const { event_id } = useParams();
    const [eventCity, setEventCity] = useState('');

    const urlEventCity = "http://192.168.1.19:3000/getEvent/"+event_id;
    

    useEffect(() => {
        const configEventCity = {
            method: 'get',
            url: urlEventCity,
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
        };
    
        axios.request(configEventCity)
            .then(data => data)
            .then(res => {
                setEventCity(res.data[0].city);
            })
            .catch(err => console.error(err));
    },[event_id])
    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Agregar Invitado a "{eventCity}"</h2>
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