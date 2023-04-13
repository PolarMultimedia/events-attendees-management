import React from "react";
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div className="overflow-hidden bg-gray-900">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Administracion de Eventos Polar
                </h2>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/tours"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 md:py-4 md:px-10 md:text-lg"
                    >
                        Ver Giras
                    </Link>
                    <Link
                        to="/agregar-tour"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 md:py-4 md:px-10 md:text-lg"
                    >
                        Agregar Nueva Gira
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Home;