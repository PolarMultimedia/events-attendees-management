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
                <ToursList tours={this.state.tours} />
                <div className="mt-10 flex items-center justify-center py-2">
                    <Link
                        to="/agregar-tour"
                        className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-gray-900 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                    >
                        Agregar Nueva Gira
                    </Link>
                </div>
                <div className="mt-10 flex items-center justify-center py-2">
                    <Link
                        to={"/"}
                        className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                    >
                        Regresar
                    </Link>
                </div>
            </>
        );
    };
}

export default Tours;