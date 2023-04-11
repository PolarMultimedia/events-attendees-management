import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { AttendeesListComponent, SearchBox } from "../components";

function Attendees() {

    const { event_id } = useParams();
    const [list, setList] = useState([]);
    const [eventCity, setEventCity] = useState('');
    const [tourId, setTourId] = useState('');
    const [searchField, setSearchField] = useState('');
    const url = "http://localhost:3000/getAttendees/"+event_id;
    const urlEventCity = "http://localhost:3000/getEvent/"+event_id;

    const onSearchChange = (e) => {
        setSearchField(e.target.value);
    } 

    const filteredList = list.filter(attendee => {
        return attendee.name.toLowerCase().includes(searchField) || attendee.lastname.toLowerCase().includes(searchField);
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
                setEventCity(res.data[0].city);
            })
            .catch((error) => console.error(error))
        )
        .catch((error) => console.error(error))
    }, []);

    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Lista de Invitados a "{eventCity}"</h2>
            </div>
            <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                <Link
                    to={"/escanear/"+event_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-amber-400 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Escanear QR
                </Link>
            </div>
            <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                <SearchBox searchChange={onSearchChange} />
            </div>
            <AttendeesListComponent list={filteredList}/>
            <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                <Link
                    to={"/importar-invitados/"+event_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-green-500 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Importar Invitados
                </Link>
                
                <Link
                    to={"/agregar-invitado/"+event_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-green-500 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Agregar Nuevo Invitado
                </Link>
            </div>
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/eventos/"+tourId}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Regresar
                </Link>
            </div>
        </>
    );
}

export default Attendees;