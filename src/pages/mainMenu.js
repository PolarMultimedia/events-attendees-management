import React from "react";
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div className="overflow-hidden">
            <div className="px-6 py-32 sm:px-6 lg:py-16 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-principal sm:text-4xl">
                        Eventos Polar Multimedia
                    </h2>
                    <div className="mt-10 flex flex-col cols-1 items-center justify-center gap-6">
                        <Link
                            to="/tours"
                            className="flex w-full items-center justify-center rounded-md border border-contrast bg-white px-8 py-3 text-base font-medium text-gray-900 md:py-4 md:px-10 md:text-lg"
                        >
                            Ver Eventos
                        </Link>
                        <Link
                            to="/agregar-tour"
                            className="flex w-full items-center justify-center rounded-md border border-contrast bg-white px-8 py-3 text-base font-medium text-gray-900 md:py-4 md:px-10 md:text-lg"
                        >
                            Agregar Evento
                        </Link>
                    </div>
                    <div className="pt-6 lg:pt-8">
                        Ultimos eventos
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;