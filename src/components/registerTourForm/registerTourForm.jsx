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
    const url = "http://localhost:3000/addTour";

    const config = {
        method: 'post',
        url: url,
        data: JSON.stringify(formValues),
        headers: { 
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
    };

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
        if(Object.keys(formErrors).length === 0 && isSubmiting){
            axios.request(config)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => console.error(err))
        }
    }, [formErrors]);

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
            <div className="overflow-hidden shadow sm:rounded-md">
                <form>
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre del Tour
                                </label>
                                <input
                                    type="text"
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
                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                    <button
                        onClick={handleSubmit}
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm lg:text-2xl lg:font-semibold font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                        Registrar Tour
                    </button>
                </div>
                {
                    isSuccess? (
                        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                            <div className="flex">
                                <div>
                                    <p className="font-bold">Tour registrado exitosamente</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default RegisterTourForm;