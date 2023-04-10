import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AttendeesListComponent } from "../components";

function Attendees() {

    const { event_id } = useParams();
    const [list, setList] = useState([]);
    const url = "http://localhost:3000/getAttendees/"+event_id;

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
        .then(attendees => {
            setList(attendees?.data)
        })
        .catch((error) => console.error(error))
    }, []);

    return (
        <>
            <AttendeesListComponent list={list} />
        </>
    );
}

export default Attendees;