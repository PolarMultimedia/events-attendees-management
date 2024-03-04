import React, { useState} from "react";
import axios from "axios";
import Papa from 'papaparse';

function AttendeesImporter ({event_id, setImporting}) {

    const url = "http://localhost:3000/registerAttendees";

    const [importedList, setImportedList] = useState([]);

    const changeHandler = (event) => {
        console.log(event.target.files[0]);

        Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            setImportedList(results.data);
            console.log(results.data)
        },
        });
    };

    const cancelImport = () => {
        setImportedList([]);
    }

    const sendAttendees = async() => {
        axios.request(url, {
            method: 'post',
            url: url,
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            data: JSON.stringify({
                "event_id": ""+event_id,
                "users": importedList
            })
        })
        .then(response => response)
        .then(res => res.data[0])
        .then(resp => console.log(resp))
        .then(window.location.reload(true))
        .catch(err => console.error(err))
    }

    return (

        <>
            <div>    
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={changeHandler}
                    style={{ display: "block", margin: "10px auto" }}
                />
            </div>
            <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                <button 
                    type="button"
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-400 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                    onClick={() => setImporting(false)}
                >
                    Cancelar Importacion
                </button>
            </div>
            { importedList.length !== 0 ? 
           <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Lista de Invitados a importar</h2>
                </div>
                <div className="px-4 py-3 text-right sm:px-6 ">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {importedList.map((attendee) => (
                            <li key={attendee.professional_code}>
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="flex min-w-0 flex-1 items-center">
                                        <div className="min-w-0 flex-1 px-4 md:grid md:gap-4">
                                            <div>
                                                <p className="truncate text-sm text-start font-medium text-gray-900">{attendee.name}</p>
                                                {
                                                    attendee.professional_code.length > 8 ? 
                                                    <p className="mt-2 flex items-center text-sm text-red-500">Cedula Profesional: {attendee.professional_code}</p> 
                                                    :  <p className="mt-2 flex items-center text-sm text-gray-500">Cedula Profesional: {attendee.professional_code}</p>
                                                }  
                                                <p className="mt-2 flex items-center text-sm text-gray-500">Código: {attendee.code}</p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">Confirmación: {attendee.confirmation_status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 flex items-center justify-center py-2 space-x-2">
                        <button 
                            type="button"
                            className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-green-500 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                            onClick={() => sendAttendees()}
                        >
                            Importar
                        </button>
                        <button 
                            type="button"
                            className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-green-500 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                            onClick={() => cancelImport()}
                        >
                            Cancelar Importación
                        </button>
                    </div>
                </div>
            </>    : 
                <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                    <h3 className="text-xl font-bold tracking-tight text-morado_abalat sm:text-2xl">No hay invitados registrados</h3>
                </div>
           } 
        </>
    )
}

export default AttendeesImporter;