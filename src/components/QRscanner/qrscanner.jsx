import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

function Scanner ({listAttendees}) {
    const delay = 100000;
    const [scannedAttendee, setScannedAttendee] = useState({});
    const [scanning, setScanning] = useState(true);
    const [unregistered, setUnregistered] = useState(false);
    const [alreadyScanned, setAlreadyScanned] = useState(false);
    const url = 'http://localhost:3000/registerAttendance/';

    const searchAttendee = (code) => {
        const attendee = listAttendees.find(attendee => attendee.code === code);
        if (!attendee) {
            setUnregistered(true);
        } else {
            setScannedAttendee(attendee);
            if (attendee.attendance) {
                setAlreadyScanned(true);
            } else {
                registerAttendance(attendee.id);
            }
        }
    }

    const resetScanner = () => {
        setAlreadyScanned(false);
        setScanning(true);
        setUnregistered(false);
        setScannedAttendee({});
    }

    useEffect(() => {
       
    },[scannedAttendee, alreadyScanned, scanning, unregistered])
    

    const registerAttendance = (attendee_id) => {
        axios.request({
            method: 'post',
            url: url,
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            data: JSON.stringify({
                "user_id": ""+attendee_id
            })
        })
        .then(response => response)
        .then(res => res.data[0])
        .then(resp => console.log(resp))
        .catch(err => console.error(err))
    
        return false;
    }

    const handleError = (err) => {
        alert('error: '+err.message);
    }

    const handleScan = (data) => {
        if(data != null) {
            setScanning(false);
            searchAttendee(data.text);
            data = null;
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
                    constraints={
                        {
                            facingMode: 'environment'
                        }
                    }
                    />
                    : <div className='justify-center mt-6'>
                        <h2 className='text-center text-bold text-red-500'> Asistencia registrada </h2>  
                        <h1 className='text-center'>QR Escaneado</h1>
                        <h2 className='text-center'>Invitado:  {scannedAttendee.name}</h2>
                        <h2 className='text-center'>Cedula profesional: {scannedAttendee.professional_code} </h2>
                    </div>
                } 
               {
                unregistered?
                    <div className='justify-center mt-6'>
                        <h1 className='text-center'>Boleto invalido</h1>
                    </div>
                    :   null
               } 
               {
                alreadyScanned ?
                    <div className='justify-center mt-6'>
                        <h2 className='text-center text-bold text-red-500'> Asistencia ya registrada </h2>  
                    </div>
                    : null
               }
            </div>
        </>
    );

}

export default Scanner;