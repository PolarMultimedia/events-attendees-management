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
    const [importing, setImporting] = useState(false);
    const [tourId, setTourId] = useState('');
    const [searchField, setSearchField] = useState('');
    const url = "https://events-admin-api.herokuapp.com/getAttendees/"+event_id;
    const urlEventCity = "https://events-admin-api.herokuapp.com/getEvent/"+event_id;
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

    console.log(reportList)

    const csvReport = {
        data: reportList,
        headers: headers,
        filename: 'ReporteAsistencia'+eventCity+'.csv'
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
            .catch((error) => console.error(error))
        )
        .catch((error) => console.error(error))
    }, [url, urlEventCity]);

    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Lista de Invitados a "{eventCity}"</h2>
            </div>
            {
                importing ? 
                <AttendeesImporter event_id={event_id} setImporting={setImporting}/>
                : <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                    <button 
                        type="button"
                        className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-green-500 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                        onClick={() => setImporting(true)}
                    >
                        Importar Invitados
                    </button>

                </div>
            }
            <div className="grid grid-cols-1 gap-even sm:grid-cols-2 md:grid-cols-3">
                <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                    <Link
                        to={"/agregar-invitado/"+event_id}
                        className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-green-500 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                    >
                        Agregar Nuevo Invitado
                    </Link>
                </div>
                {
                    list.length !== 0 ?
                    <div className="mt-10 flex items-center justify-center py-2">
                        <CSVLink
                            {...csvReport}
                            className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-amber-400 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                        >
                            Descargar reporte
                        </CSVLink>
                    </div> 
                    : null
                }
                
                <div className="mt-10 flex items-center justify-center py-2">
                    <Link
                        to={"/eventos/"+tourId}
                        className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                    >
                        Regresar
                    </Link>
                </div>
            </div>
            {
                list.length !== 0 ? 
                <div className="grid grid-flow-col">
                    <div className="flex items-center justify-center py-4">
                        <SearchBox searchChange={onSearchChange} />
                    </div>
                    <div className="mt-10 flex items-center justify-center py-2">
                        <Link
                            to={"/escanear/"+event_id}
                            className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                        >
                            Escanear
                        </Link>
                    </div>
                </div>
                : null
            }
            <AttendeesListComponent list={filteredList}/>
        </>
    );
}

export default Attendees;