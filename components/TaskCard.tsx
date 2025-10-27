
import React from 'react';
import { Task, FamilyMember, TaskStatus } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { PencilIcon } from './icons/PencilIcon';

interface TaskCardProps {
    task: Task;
    members: FamilyMember[];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, members }) => {
    const assignee = members.find(m => m.id === task.assigneeId);
    const relatedMembers = task.relatedMemberIds
        ?.map(id => members.find(m => m.id === id))
        .filter((m): m is FamilyMember => !!m && m.id !== task.assigneeId) ?? [];

    const allInvolved = assignee ? [assignee, ...relatedMembers] : relatedMembers;
    
    const colors = CATEGORY_COLORS[task.category];
    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;

    const getStatusChip = () => {
        switch(task.status) {
            case TaskStatus.DONE:
                return <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-200 text-green-800">Выполнено</span>
            case TaskStatus.IN_PROGRESS:
                return <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-200 text-blue-800">В процессе</span>
            default:
                return <span className={`text-xs font-medium px-2 py-1 rounded-full ${isOverdue ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'}`}>К выполнению</span>
        }
    }
    
    const handleEditClick = () => {
        alert(`Функция редактирования для задачи "${task.title}" в разработке.`);
    }

    return (
        <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${colors.border} flex flex-col justify-between`}>
            <div className="group">
                <div className="flex justify-between items-start">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                        {task.category}
                    </span>
                    {allInvolved.length > 0 && (
                        <div className="flex -space-x-3">
                            {allInvolved.map(member => (
                                <img 
                                    key={member.id}
                                    src={member.avatar}
                                    alt={member.name}
                                    title={member.name}
                                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                />
                            ))}
                        </div>
                    )}
                </div>
                 <div className="flex justify-between items-start mt-3">
                    <h4 className="font-bold flex-grow pr-2">{task.title}</h4>
                    <button onClick={handleEditClick} className="text-gray-400 hover:text-blue-600 p-1 rounded-full -mr-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PencilIcon className="w-5 h-5" />
                    </button>
                </div>
                {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                    <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                        {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                    </span>
                </div>
                {getStatusChip()}
            </div>
        </div>
    );
};

export default TaskCard;