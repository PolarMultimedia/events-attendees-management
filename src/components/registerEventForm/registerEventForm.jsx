import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const days = [
    {
        id: "1",
        value: "01"
    },
    {
        id: "2",
        value: "02"
    },
    {
        id: "3",
        value: "03"
    },
    {
        id: "4",
        value: "04"
    },
    {
        id: "5",
        value: "05"
    },
    {
        id: "6",
        value: "07"
    },
    {
        id: "7",
        value: "07"
    },
    {
        id: "8",
        value: "08"
    },
    {
        id: "9",
        value: "09"
    },
    {
        id: "10",
        value: "10"
    },
    {
        id: "11",
        value: "11"
    },
    {
        id: "12",
        value: "12"
    },
    {
        id: "13",
        value: "13"
    },
    {
        id: "14",
        value: "14"
    },
    {
        id: "15",
        value: "15"
    },
    {
        id: "16",
        value: "16"
    },
    {
        id: "17",
        value: "17"
    },
    {
        id: "18",
        value: "18"
    },
    {
        id: "19",
        value: "19"
    },
    {
        id: "20",
        value: "20"
    },
    {
        id: "21",
        value: "21"
    },
    {
        id: "22",
        value: "22"
    },
    {
        id: "23",
        value: "23"
    },
    {
        id: "24",
        value: "24"
    },
    {
        id: "25",
        value: "25"
    },
    {
        id: "26",
        value: "26"
    },
    {
        id: "27",
        value: "27"
    },
    {
        id: "28",
        value: "28"
    },
    {
        id: "29",
        value: "29"
    },
    {
        id: "30",
        value: "30"
    },
    {
        id: "31",
        value: "31"
    }
];
const months = [
    {
        id: "1",
        value: "01",
        text: "Enero"
    },
    {
        id: "2",
        value: "02",
        text: "Febrero"
    },
    {
        id: "3",
        value: "03",
        text: "Marzo"
    },
    {
        id: "4",
        value: "04",
        text: "Abril"
    },
    {
        id: "5",
        value: "05",
        text: "Mayo"
    },
    {
        id: "6",
        value: "07",
        text: "Junio"
    },
    {
        id: "7",
        value: "07",
        text: "Julio"
    },
    {
        id: "8",
        value: "08",
        text: "Agosto"
    },
    {
        id: "9",
        value: "09",
        text: "Septiembre"
    },
    {
        id: "10",
        value: "10",
        text: "Octubre"
    },
    {
        id: "11",
        value: "11",
        text: "Noviembre"
    },
    {
        id: "12",
        value: "12",
        text: "Diciembre"
    }
];
const years = [
    {
        id: "1",
        value: "2023"
    },
    {
        id: "2",
        value: "2024"
    },
    {
        id: "3",
        value: "2025"
    },
    {
        id: "4",
        value: "2026"
    },
    {
        id: "5",
        value: "2027"
    },
    {
        id: "6",
        value: "2028"
    },
    {
        id: "7",
        value: "2029"
    },
    {
        id: "8",
        value: "2030"
    },
    {
        id: "9",
        value: "2031"
    },
    {
        id: "10",
        value: "2032"
    },
    {
        id: "11",
        value: "2033"
    },
    {
        id: "12",
        value: "2034"
    },
    {
        id: "13",
        value: "2035"
    },
    {
        id: "14",
        value: "2036"
    },
    {
        id: "15",
        value: "2037"
    },
    {
        id: "16",
        value: "2038"
    },
    {
        id: "17",
        value: "2039"
    },
    {
        id: "18",
        value: "2040"
    },
    {
        id: "19",
        value: "2041"
    },
    {
        id: "20",
        value: "2042"
    }
];
const hours = [
    {
        id: "1",
        value: "00"
    },
    {
        id: "2",
        value: "02"
    },
    {
        id: "3",
        value: "03"
    },
    {
        id: "4",
        value: "04"
    },
    {
        id: "5",
        value: "05"
    },
    {
        id: "6",
        value: "06"
    },
    {
        id: "7",
        value: "07"
    },
    {
        id: "8",
        value: "08"
    },
    {
        id: "9",
        value: "09"
    },
    {
        id: "10",
        value: "10"
    },
    {
        id: "11",
        value: "11"
    },
    {
        id: "12",
        value: "12"
    },
    {
        id: "13",
        value: "13"
    },
    {
        id: "14",
        value: "14"
    },
    {
        id: "15",
        value: "15"
    },
    {
        id: "16",
        value: "16"
    },
    {
        id: "17",
        value: "17"
    },
    {
        id: "18",
        value: "18"
    },
    {
        id: "19",
        value: "19"
    },
    {
        id: "20",
        value: "20"
    },
    {
        id: "21",
        value: "21"
    },
    {
        id: "22",
        value: "22"
    },
    {
        id: "23",
        value: "23"
    },
    {
        id: "24",
        value: "24"
    }
];
const minutes = [
    {
        id: "1",
        value: "00"
    },
    {
        id: "2",
        value: "15"
    },
    {
        id: "3",
        value: "30"
    },
    {
        id: "4",
        value: "45"
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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
    const url = "https://events-admin-api.herokuapp.com//addEvent";

    

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
            <div className="overflow-hidden shadow sm:rounded-md">
                <h1 className='text-center text-lg'>Agregar Evento al Tour "{tourName}"</h1>
                <form>
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre del Evento
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
                {
                    isSubmiting ? null :
                    <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
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
                                        <p className="font-bold">Evento registrado exitosamente en el tour {tourName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                                <button
                                    onClick={handleReset}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm lg:text-2xl lg:font-semibold font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                    >
                                    Agregar otro evento
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