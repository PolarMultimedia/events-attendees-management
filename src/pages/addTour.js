import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterTourForm } from '../components';

function RegisterTourPage () {
    return (
        <>
            <RegisterTourForm />
            <div className="mt-2 flex items-center justify-center py-2">
                <Link
                    to={"/tours"}
                    className="flex w-42 items-center justify-center rounded-lg border border-transparent bg-red-600 px-8 py-2 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                >
                    Cancelar
                </Link>
            </div>
        </>
    );
}

export default RegisterTourPage;