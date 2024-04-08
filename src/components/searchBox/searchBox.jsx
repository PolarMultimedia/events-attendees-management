
import React from "react";

const SearchBox = ({ searchChange }) => {
    return (
        <div className="px-10">
            <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
                Buscar invitado
            </label>
            <div className="relative mt-2 flex items-center">
                <input
                    className="w-60% rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-"
                    placeholder="Buscar Invitado"
                    type="search"
                    name="search"
                    id="search"
                    onChange={searchChange}
                    />
            </div>
        </div>
    );
}

export default SearchBox;