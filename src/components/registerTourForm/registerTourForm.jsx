import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegisterTourForm () {
    const initialValues = {
        name: '',
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isSuccess, setSuccess] = useState(false);
    const url = "https://events-admin-api.herokuapp.com/addTour";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmiting(true);
    };

    useEffect(() => {
        const config = {
            method: 'post',
            url: url,
            data: JSON.stringify(formValues),
            headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            },
        };
        if(Object.keys(formErrors).length === 0 && isSubmiting){
            axios.request(config)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => console.error(err))
        }
    }, [formErrors, url, formValues, isSubmiting]);

    const validate = (values) => {
        const errors = {};
        if(!values.name){
            errors.name = 'El nombre es obligatorio';
        } else if (values.name.length <= 6){
            errors.name = 'El nombre del tour debe tener al menos 6 caracteres';
        }

        return errors;
    }

    return(
        <>
            <div className="overflow-hidden">
                <form>
                    <div className="bg-white px-4 py-5 sm:p-20">
                            {
                                isSuccess? (
                                    <div className="bg-teal-100 border-b-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                        <div className="text-center">
                                                <p className="font-bold">Evento agregado correctamente</p>
                                        </div>
                                    </div>
                                ) : null
                            }
                            <div className="max-w-36 my-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre del evento
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="ex: Polarween 2024"
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                                />
                                <label htmlFor="name" className="block text-sm font-medium text-red-600">
                                    {formErrors.name}
                                </label>
                            </div>
                    </div>
                </form>
                <div className="px-4 text-center sm:px-6">
                    <button
                        onClick={handleSubmit}
                        className="inline-flex uppercase justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm lg:text-2xl lg:font-semibold font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                        Agregar evento
                    </button>
                </div>
            </div>
        </>
    );
}

export default RegisterTourForm;