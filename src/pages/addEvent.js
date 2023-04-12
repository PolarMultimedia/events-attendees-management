import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { RegisterEventForm } from '../components';

function RegisterEventPage () {
    const { tour_id } = useParams();
    const [tour, setTour] = useState([]);
    const url = "https://events-admin-api.herokuapp.com//getTour/"+tour_id;



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
        .then(tourData => {
            setTour(tourData?.data[0])
        })
        .catch((error) => console.error(error))
    },[url]);

    return (
        <>
            <RegisterEventForm tourId={tour.id} tourName={tour.name} />
            <div className="mt-10 flex items-center justify-center py-2">
                <Link
                    to={"/eventos/"+tour_id}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Regresar
                </Link>
            </div>
        </>
    );
}

export default RegisterEventPage;