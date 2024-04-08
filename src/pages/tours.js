import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { ToursList } from "../components";

class Tours extends Component  {

    constructor(){
        super();
        this.state = {
            tours: [],
        }
    }

    componentDidMount(){
        fetch('https://events-admin-api.herokuapp.com/getTourTotalEvents')
        .then(response => response.json())
        .then(tours => {
            this.setState({tours: tours});
        })
        .catch(err => console.error(err))
    }

    render(){
        return (
            <>
                <div className="mt-4 ml-10 flex flex-col lg:flex-row lg:justify-start cols-1 items-center justify-end gap-6">
                    <Link
                        to="/"
                        className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                    >
                        Regresar
                    </Link>
                    <Link
                        to="/agregar-tour"
                        className="flex items-center justify-center rounded-md border border-contrast bg-white px-2 py-3 text-base font-medium text-gray-900 md:py-4 md:px-2 md:text-md"
                    >
                        Nuevo Evento
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Link>
                </div>
                <ToursList tours={this.state.tours} />
            </>
        );
    };
}

export default Tours;