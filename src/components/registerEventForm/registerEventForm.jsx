import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function RegisterEventForm ({tourId, tourName}) {
    const initialValues = {
        name: '',
    }

    const uploadValues = {
        name: '',
        date: '',
        tour_id: tourId
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [upload, setUpload] = useState(uploadValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const url = "https://events-admin-api.herokuapp.com/addEvent";

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setUpload({
            name: formValues.name,
            tour_id: tourId
        })
        setIsSubmiting(true);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormValues(initialValues);
        setIsSubmiting(false);
        setSuccess(false);
        setUpload(uploadValues);
    }

    useEffect(() => {
        const config = {
            method: 'post',
            url: url,
            data: JSON.stringify(upload),
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
        };

        if(Object.keys(formErrors).length === 0 && isSubmiting){
            console.log(upload);
            axios.request(config)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => console.error(err))
        }
    }, [formErrors, isSubmiting, upload]);

    const validate = (values) => {
        const errors = {};
        if(!values.name) {
            errors.name = 'El nombre de la ciudad es obligatorio';
        } else if (values.name.length <= 3){
            errors.name = 'El nombre del evento debe de ser de al menos 3 caracteres'
        }
        return errors;
    }
 
    return(
        <>
            <div className="overflow-hidden p-10">
                <h1 className='text-center text-2xl font-semibold'>Agregar fecha al evento "{tourName}"</h1>
                <form>
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="flex flex-row justify-center">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                                />
                                <label htmlFor="name" className="block text-sm font-medium text-red-600">
                                    {formErrors.name}
                                </label>
                            </div>                  
                        </div>
                    </div>
                </form>
                {
                    isSubmiting ? null :
                    <div className="px-4 py-3 text-center sm:px-6">
                        <button
                            onClick={handleSubmit}
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm lg:text-2xl lg:font-semibold font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                            >
                            Registrar Evento
                        </button>
                    </div>
                }
                {
                    isSuccess? (
                        <>
                            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                <div className="flex">
                                    <div>
                                        <p className="font-bold">Fecha registrada exitosamente en el evento {tourName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-center sm:px-6">
                                <button
                                    onClick={handleReset}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm lg:text-2xl lg:font-semibold font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                    >
                                    Agregar otra fecha
                                </button>
                            </div>
                        </>
                    ) : null
                }
            </div>
        </>
    );
}

export default RegisterEventForm;