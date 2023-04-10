import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RegisterEventForm } from '../components';

function RegisterEventPage () {
    const { tour_id } = useParams();
    const [tour, setTour] = useState([]);
    const url = "http://localhost:3000/getTour/"+tour_id;

    const config = {
        method: 'get',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
    };

    useEffect(() => {
        axios.request(config)
        .then((data) => data)
        .then(tourData => {
            setTour(tourData?.data[0])
        })
        .catch((error) => console.error(error))
    },[]);

    console.log(tour)
    return (
        <>
            <RegisterEventForm tourId={tour.id} tourName={tour.name} />
        </>
    );
}

export default RegisterEventPage;