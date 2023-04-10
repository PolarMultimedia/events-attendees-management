import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendeeCard({ attendee }) {

    const uploadValues = {
        user_id: attendee.id,
        professional_code: attendee.professional_code,
    }
    
    const initialValues = {
        professional_code: ''
    }
    
    const [formValues, setFormValues] = useState(initialValues);
    const [upload, setUpload] = useState(uploadValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const url = "http://localhost:3000/updateAttendeeProfessionalCode";
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setUpload({
            user_id: uploadValues.user_id,
            professional_code: formValues.professional_code
        })
        setIsSubmiting(true);
    }
    
    useEffect(() => {
        const config = {
            method: 'put',
            url: url,
            data: JSON.stringify(upload),
            headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }
    
        if(Object.keys(formErrors).length === 0 && isSubmiting){
            console.log('send data')
            axios.request(config)
            .then(response => response.data)
            .then(res => {
                console.log(res);
                setSuccess(true);
            })
            .catch(err => console.error(err))
        }

    },[])
    



    const validate = (values) => {
        const errors = {};
        if(!values.professional_code){
            errors.professional_code = 'La cedula profesional es obligatoria';
        } else if (values.professional_code.length > 8) {
            errors.professional_code = 'La cedula profesional no puede tener mas de 8 digitos';
        } else if (values.professional_code.length < 6) {
            errors.professional_code = 'La cedula profesional no puede tener menos de 6 digitos';
        }
        return errors;
    }

    return (
        <>
            <div className="text-center px-4 pt-16 pb-10 sm:px-2 lg:px-8 lg:pt-24 lg:pb-10">
                <h2 className="text-3xl font-bold tracking-tight text-morado_abalat sm:text-4xl">Informacion del invitado "{attendee.name} {attendee.lastname}"</h2>
            </div>
            <div className="overflow-hidden shadow sm:rounded-md">
                <form>
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Cedula Profesional: {attendee.professional_code}
                                </label>
                                <input
                                    type="text"
                                    name="professional_code"
                                    id="professional_code"
                                    onChange={handleChange}
                                    placeholder='Cambiar Cedula Profesional'
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                                />
                                <label htmlFor="professional_code" className="block text-sm font-medium text-red-600">
                                    {formErrors.professional_code}
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
                        Actualizar Cedula Profesional
                    </button>
                </div>
                {
                    isSuccess? (
                        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                            <div className="flex">
                                <div>
                                    <p className="font-bold">Informacion del invitado actualizada con exito</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default AttendeeCard;