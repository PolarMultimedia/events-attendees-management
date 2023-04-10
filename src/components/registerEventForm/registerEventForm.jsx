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
const months = [];
const years = [];
const hours = [];
const minutes = [];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function RegisterEventForm ({tourId, tourName}) {
    const initialValues = {
        city: '',
        date: '',
        tour_id: tourId
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [selectedDay, setSelectedDay] = useState(days[1]);
    const [selectedMonth, setSelectedMonth] = useState(months[1]);
    const [selectedYear, setSelectedYear] = useState(years[1]);
    const [selectedHour, setSelectedHour] = useState(hours[1]);
    const [selectedMinute, setSelectedMinute] = useState(minutes[1]);
    const url = "http://localhost:3000/addEvent";

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
        if(!values.city) {
            errors.city = 'El nombre de la ciudad es obligatorio';
        } else if (values.city.length <= 3){
            errors.city = 'El nombre del evento debe de ser de al menos 3 caracteres'
        }
        return errors;
    }
 
    return(
        <>
            <div className="overflow-hidden shadow sm:rounded-md">
                <h2>Agregar Evento al Tour "{tourName}"</h2>
                <form>
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    Nombre del Evento
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                                />
                                <label htmlFor="city" className="block text-sm font-medium text-red-600">
                                    {formErrors.city}
                                </label>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                            <Listbox value={selectedDay} onChange={setSelectedDay}>
                                {({ open }) => (
                                    <>
                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Dia</Listbox.Label>
                                    <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">{selectedDay.value}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                        </Listbox.Button>

                                        <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {days.map((day) => (
                                            <Listbox.Option
                                                key={day.id}
                                                className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-8 pr-4'
                                                )
                                                }
                                                value={day}
                                            >
                                                {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {day.value}
                                                    </span>

                                                    {selected ? (
                                                    <span
                                                        className={classNames(
                                                        active ? 'text-white' : 'text-indigo-600',
                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                    ) : null}
                                                </>
                                                )}
                                            </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                        </Transition>
                                    </div>
                                    </>
                                )}
                                </Listbox>
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
                                    <p className="font-bold">Evento registrado exitosamente en el tour {tourName}</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default RegisterEventForm;