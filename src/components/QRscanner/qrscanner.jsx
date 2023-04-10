import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

function Scanner ({list}) {
    const delay = 1000;
    const [scannedName, setScannedName] = useState('');
    const [scannedCode, setScannedCode] = useState('');
    const [validQR, setValidQR] = useState(false);
    const [scanning, setScanning] = useState(true);

    const validateQR = (text) => {
        list.array.forEach(attendee => {
            if(attendee.code === text){
                setValidQR(true);
            }
        });    
    }

    const handleScan = (data) => {
        if(data != null) {
            setScanning(false);
            validateQR(data.text);
        }
    }

}