import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import {
    ScannerQRComponent
} from "../components";

function Attendees() {

    const { event_id } = useParams();
    const [list, setList] = useState([]);
    const [scanning, setScanning] = useState(true);
    const url = "https://events-admin-api.herokuapp.com/getAttendees/"+event_id;

    useEffect(() => {
        const config = {
            method: 'get',
            url: url,
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
        .catch((error) => console.error(error))
    }, []);

    return (
        <>
            {
                list.length !== 0 ? 
                <>
                    {
                        scanning ?
                        <>  

                            <ScannerQRComponent listAttendees={list}/>
                            <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                                <button 
                                    type="button" 
                                    onClick={() => setScanning(false)}
                                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-400 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                                >
                                    Dejar de escanear
                                </button>
                            </div>
                        </> 
                        :
                        <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                            <button 
                                type="button" 
                                onClick={() => setScanning(true)}
                                className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-amber-400 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                            >
                                Escanear QR
                            </button>
                        </div>
                    }
                </>
                : null
            }
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

export default Attendees;