import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { 
    Bars3Icon,
    XMarkIcon 
} from '@heroicons/react/24/solid';

const navigation = [
    {
        name: 'Inicio',
        href: '/'
    },
    {
        name: 'Tours',
        href: '/tours'
    }
]

class Layout extends Component {
    render() {
        const children = this.props.children;
        return (
            <div className="bg-white">
                <div className="relative overflow-hidden">
                    <Popover as="header" className="relative">
                        <div className="bg-white pt-6 pb-0">
                        <nav
                            className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
                            aria-label="Global"
                        >
                            <div className="flex flex-1 items-center">
                            <div className="flex w-full items-center justify-between md:w-auto">
                                <Link to="/">
                                <span className="sr-only">Administracion de Eventos</span>
                                </Link>
                                <div className="-mr-2 flex items-center md:hidden">
                                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-azul_abalat p-2 text-white focus:outline-none focus:ring-2 focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                                </div>
                            </div>
                            <div className="hidden space-x-8 md:ml-10 md:flex">
                                {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-base font-medium text-azul_abalat hover:text-gray-300"
                                >
                                    {item.name}
                                </Link>
                                ))}
                            </div>
                            </div>
                        </nav>
                        <hr className='bg-azul_abalat w-full h-2 lg:h-4' />
                        </div>
            
                        <Transition
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        >
                        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden">
                            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                            <div className="flex items-center justify-between px-5 pt-4">
                                <div className="-mr-2">
                                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                                </div>
                            </div>
                            <div className="pt-5 pb-6">
                                <div className="space-y-1 px-2">
                                {navigation.map((item) => (
                                    <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-black"
                                    >
                                    {item.name}
                                    </Link>
                                ))}
                                </div>
                            </div>
                            </div>
                        </Popover.Panel>
                        </Transition>
                    </Popover>
                    <main>
                        {children}
                    </main>
                    <footer className="bg-gray-900" aria-labelledby="footer-heading">
                        <h2 id="footer-heading" className="sr-only">
                        Footer
                        </h2>
                        <div className="mx-auto max-w-md px-4 sm:max-w-7xl sm:px-6 lg:px-8 lg:pt-10">
                            <div className="mt-12 border-t border-gray-200 py-8">
                                <p className="text-base text-gray-400 xl:text-center">
                                &copy; 2023 2022 Polar Multimedia Todos los derechos reservados.
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
};

export default Layout;