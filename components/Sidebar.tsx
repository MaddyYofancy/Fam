import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { WalletIcon } from './icons/WalletIcon';
import { DogIcon } from './icons/DogIcon';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';
import { MenuIcon } from './icons/MenuIcon';
import { HeartIcon } from './icons/HeartIcon';
import { View } from '../types';

interface SidebarProps {
    setView: (view: View) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    view: View;
}

const Sidebar: React.FC<SidebarProps> = ({ setView, isSidebarOpen, setIsSidebarOpen, view }) => {
    
    const NavLink: React.FC<{
        icon: React.ElementType;
        label: string;
        onClick?: () => void;
        isActive?: boolean;
    }> = ({ icon: Icon, label, onClick, isActive }) => (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick();
                if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                }
            }}
            className={`flex items-center px-4 py-3 text-base rounded-lg transition-colors ${
                isActive
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600 font-medium'
            }`}
        >
            <Icon className="w-6 h-6 mr-4" />
            <span>{label}</span>
        </a>
    );

    return (
        <>
            {/* Overlay for mobile */}
             <div 
                className={`fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-72 p-6 z-40 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-2xl font-bold text-blue-600">FamilyHub</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="space-y-3 flex-grow">
                    <NavLink icon={HomeIcon} label="Главная" onClick={() => setView({ page: 'dashboard'})} isActive={view.page === 'dashboard'} />
                    <NavLink icon={HeartIcon} label="Благодарности" onClick={() => setView({ page: 'gratitude'})} isActive={view.page === 'gratitude'} />
                    <NavLink icon={UsersIcon} label="Семья" onClick={() => alert('Страница "Семья" в разработке!')} />
                    <NavLink icon={CalendarIcon} label="Календарь" onClick={() => alert('Страница "Календарь" в разработке!')} />
                    <NavLink icon={WalletIcon} label="Бюджет" onClick={() => alert('Страница "Бюджет" в разработке!')} />
                    <NavLink icon={DogIcon} label="Питомцы" onClick={() => alert('Страница "Питомцы" в разработке!')} />
                </nav>

                <div className="mt-6">
                    <button className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <PlusIcon className="w-6 h-6 mr-2" />
                        <span>Новая Задача</span>
                    </button>
                </div>
            </aside>
            
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-md shadow-md text-gray-600 hover:text-gray-900"
                aria-label="Open menu"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
        </>
    );
};

export default Sidebar;