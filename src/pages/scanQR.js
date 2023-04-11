import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { ScannerQRComponent } from '../components';

function ScanQRPage () {
    const {event_id} = useParams();
    const [list, setList] = useState([]);
    const [tourName, setTourName] = useState('');
    const [eventCity, setEventCity] = useState('');
    const [tourId, setTourId] = useState('');
    const url = "http://localhost:3000/getAttendees/"+event_id;
    const urlTourName = "http://localhost:3000/getTour/"+tourId;
    const urlEventCity = "http://localhost:3000/getEvent/"+event_id;

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
            .then(
                axios.request(configTourName)
                .then(data => data)
                .then(res => {
                    setTourName(res.data[0].name);
                })
                .catch((error) => console.error(error))
            )
            .catch((error) => console.error(error))
        )
        .catch((error) => console.error(error))
    }, []);

    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Escanear QR de Invitados a "{tourName} {eventCity}"</h2>
            </div>
            <ScannerQRComponent listAttendees={list} />
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/invitados/"+event_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Regresar
                </Link>
            </div>
        </>
    );
}

export default ScanQRPage;