import React from 'react';
import { FamilyMember, Task, TaskStatus, View } from '../types';
import TaskCard from './TaskCard';
import { PencilIcon } from './icons/PencilIcon';

interface DashboardProps {
    members: FamilyMember[];
    tasks: Task[];
    setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ members, tasks, setView }) => {
    const upcomingTasks = tasks
        .filter(t => t.status !== TaskStatus.DONE)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5);

    const handleEditClick = (name: string) => {
        alert(`Функция редактирования для "${name}" в разработке.`);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Добро пожаловать домой!</h1>
                <p className="text-gray-500 mt-1">Вот что происходит в вашей семье сегодня.</p>
            </div>

            <section>
                <h2 className="text-xl font-semibold mb-4">Члены Семьи</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {members.map(member => (
                        <div 
                            key={member.id} 
                            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 group relative"
                        >
                             <button 
                                onClick={(e) => { e.stopPropagation(); handleEditClick(member.name); }}
                                className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                aria-label={`Редактировать ${member.name}`}
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                            <div onClick={() => setView({ page: 'member', memberId: member.id })} className="cursor-pointer w-full">
                                <img 
                                    src={member.avatar} 
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200 mx-auto"
                                />
                                <h3 className="text-lg font-bold">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                            </div>
                        </div>
                    ))}
                     <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-colors relative group">
                        <button onClick={(e) => { e.stopPropagation(); handleEditClick('Рекс'); }} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Редактировать Рекса">
                            <PencilIcon className="w-5 h-5" />
                        </button>
                        <img src="https://picsum.photos/seed/rex/200" alt="Рекс" className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200" />
                        <h3 className="text-lg font-bold">Рекс</h3>
                        <p className="text-gray-500">Собака</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Ближайшие Задачи</h2>
                {upcomingTasks.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {upcomingTasks.map(task => (
                            <TaskCard key={task.id} task={task} members={members} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white text-center p-6 rounded-lg shadow-sm">
                        <p className="text-gray-500">На ближайшее время задач нет. Отличная работа!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;