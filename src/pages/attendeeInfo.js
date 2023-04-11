import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AttendeeCard } from '../components';

function AttendeeInfoPage () {
    const { user_id } = useParams();
    const [attendee, setAttendee] = useState({});
    const [event_id, setEventId] = useState('');
    const url = "http://localhost:3000/getAttendee/"+user_id;

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
        .then(response => response.data[0])
        .then(res => {
            setAttendee(res)
            console.log('event_id', attendee.event_id)
            setEventId(attendee.event_id)
        })
        .then()
        .catch(err => console.error(err));
    },[]);
    return (
        <>
            <AttendeeCard attendee={attendee} />
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

export default AttendeeInfoPage;