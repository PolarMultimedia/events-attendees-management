import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

function Scanner ({listAttendees}) {
    const delay = 100000;
    const uploadValues = {
        user_id: ''
    }
    const [scannedAttendee, setScannedAttendee] = useState({});
    const [scannedCode, setScannedCode] = useState('');
    const [scanning, setScanning] = useState(true);
    const [upload, setUpload] = useState(uploadValues);
    const [success, setSuccess] = useState(false);
    const url = 'http://localhost:3000/registerAttendance/'+setScannedAttendee.id;

    

    useEffect(() =>{
        const config = {
            method: 'post',
            url: url,
            data: JSON.stringify(upload),
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
        }

        const searchAttendee = (code) => {
            setScannedAttendee(listAttendees.find(attendee => attendee.code === code));
            console.log('scanned',listAttendees)
            setUpload({
                user_id: scannedAttendee.id
            })
        }
        
        const validateQR = (text) => {
                setScannedCode(text);
                searchAttendee(scannedCode);
        }
    


        if(!scanning) {
            axios.request(config)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => console.error(err));
        } 
    }, []);

    const handleError = (err) => {
        alert('error: '+err.message);
    }

    const handleScan = (data) => {
        if(data != null) {
            setScanning(false);
        }
    } 
    

    return (
        <>
            <div className='pt-6 pb-6 pr-4 pl-4 bg-gray-200'>
                { scanning?
                <QrReader
                delay={delay}
                onError={handleError}
                onResult={handleScan}
                />
                : 
                <div className='justify-center mt-6'>
                    <h1 className='text-center'>QR Escaneado</h1>
                    <h2 className='text-center'>Invitado:  "Nombre" {"Apellido"}</h2>
                    <h2 className='text-center'>Cedula profesional: {"cedula prefesional"}</h2>
                </div>
                }  
{/*                 {
                    success ?
                    <div className='justify-center mt-6'>
                        <h1 className='text-center'>Se ha registrado la asistencia de {"Nombre"} {"Apellido"}</h1>
                        <div className="px-4 py-3 text-center sm:px-6">
                            <p>Cédula Profesional: {"cedula prefesional"}</p>
                        </div>
                    </div> : null
                } */}
            </div>
        </>
    );

}

export default Scanner;