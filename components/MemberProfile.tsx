import React, { useState } from 'react';
import { FamilyMember, Task, Goal, Achievement, GoodDeed, Plan, Interest, InterestType } from '../types';
import TaskCard from './TaskCard';
import { GoalIcon } from './icons/GoalIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { PencilIcon } from './icons/PencilIcon';
import { ThumbUpIcon } from './icons/ThumbUpIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface MemberProfileProps {
    member: FamilyMember;
    tasks: Task[];
    onBack: () => void;
}

type ActiveTab = 'tasks' | 'goals' | 'achievements' | 'needs' | 'goodDeeds' | 'plans' | 'interests';

const MemberProfile: React.FC<MemberProfileProps> = ({ member, tasks, onBack }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');
    
    const handleEditClick = (item: string) => {
        alert(`Функция редактирования для "${item}" в разработке.`);
    };

    const TabButton: React.FC<{tab: ActiveTab, label: string}> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                    <img src={member.avatar} alt={member.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4 sm:mr-6 border-4 border-blue-200" />
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-bold">{member.name}</h1>
                            <button onClick={() => handleEditClick(member.name)} className="text-gray-400 hover:text-blue-600 p-1 rounded-full transition-colors">
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-500 text-md sm:text-lg">{member.role}</p>
                    </div>
                </div>
                <button onClick={onBack} className="text-sm text-blue-600 hover:underline self-start sm:self-auto">
                    &larr; Назад к обзору
                </button>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                   <TabButton tab="tasks" label="Задачи" />
                   <TabButton tab="goals" label="Цели" />
                   <TabButton tab="achievements" label="Достижения" />
                   <TabButton tab="needs" label="Нужды" />
                   <TabButton tab="goodDeeds" label="Добрые дела" />
                   <TabButton tab="plans" label="Планы" />
                   <TabButton tab="interests" label="Интересы" />
                </div>
            </div>

            <div>
                {activeTab === 'tasks' && <TasksSection tasks={tasks} members={[member]} />}
                {activeTab === 'goals' && <GoalsSection goals={member.goals} onEdit={handleEditClick} />}
                {activeTab === 'achievements' && <AchievementsSection achievements={member.achievements} onEdit={handleEditClick} />}
                {activeTab === 'needs' && <NeedsSection needs={member.needs} onEdit={handleEditClick} />}
                {activeTab === 'goodDeeds' && <GoodDeedsSection deeds={member.goodDeeds} onEdit={handleEditClick} />}
                {activeTab === 'plans' && <PlansSection plans={member.plans} onEdit={handleEditClick} />}
                {activeTab === 'interests' && <InterestsSection interests={member.interests} onEdit={handleEditClick} />}
            </div>
        </div>
    );
};

// ... Existing sections (Tasks, Goals, Achievements, Needs) are updated below ...

const TasksSection: React.FC<{tasks: Task[], members: FamilyMember[]}> = ({ tasks, members }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><CheckCircleIcon className="w-6 h-6 mr-2 text-blue-500" />Задачи</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.length > 0 ? tasks.map(task => <TaskCard key={task.id} task={task} members={members} />) : <p className="text-gray-500">Нет назначенных задач.</p>}
        </div>
    </div>
);

const GoalsSection: React.FC<{goals: Goal[], onEdit: (title: string) => void}> = ({ goals, onEdit }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><GoalIcon className="w-6 h-6 mr-2 text-green-500" />Цели</h3>
        <div className="space-y-3">
            {goals.map(goal => (
                <div key={goal.id} className={`p-4 rounded-lg flex items-start justify-between group ${goal.achieved ? 'bg-green-50' : 'bg-yellow-50'}`}>
                    <div className="flex items-start">
                        <div className={`w-5 h-5 rounded-full mr-4 mt-1 flex-shrink-0 ${goal.achieved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <div>
                            <p className={`font-bold ${goal.achieved ? 'text-green-800' : 'text-yellow-800'}`}>{goal.title}</p>
                            {goal.description && <p className="text-sm text-gray-600">{goal.description}</p>}
                            <p className="text-xs text-gray-500 mt-1">Цель до: {new Date(goal.targetDate).toLocaleDateString('ru-RU')}</p>
                        </div>
                    </div>
                    <button onClick={() => onEdit(goal.title)} className="text-gray-400 hover:text-green-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <PencilIcon className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const AchievementsSection: React.FC<{achievements: Achievement[], onEdit: (title: string) => void}> = ({ achievements, onEdit }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><TrophyIcon className="w-6 h-6 mr-2 text-yellow-500" />Достижения</h3>
        <div className="space-y-3">
            {achievements.map(ach => (
                <div key={ach.id} className="p-4 bg-gray-100 rounded-lg group">
                    <div className="flex justify-between items-start">
                        <div className="pr-4">
                            <p className="font-bold">{ach.title} ({ach.type})</p>
                            {ach.description && <p className="text-sm text-gray-600">{ach.description}</p>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                             <p className="text-sm text-gray-500 whitespace-nowrap">{new Date(ach.date).toLocaleDateString('ru-RU')}</p>
                             <button onClick={() => onEdit(ach.title)} className="text-gray-400 hover:text-yellow-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                 <PencilIcon className="w-5 h-5" />
                             </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const NeedsSection: React.FC<{needs: string[], onEdit: (need: string) => void}> = ({ needs, onEdit }) => (
     <div>
        <h3 className="text-xl font-semibold mb-4">Нужды</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
            {needs.map((need, i) => (
                <li key={i} className="flex justify-between items-center group">
                    <span>{need}</span>
                    <button onClick={() => onEdit(need)} className="text-gray-400 hover:text-blue-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <PencilIcon className="w-5 h-5" />
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

// New Sections
const GoodDeedsSection: React.FC<{deeds: GoodDeed[], onEdit: (text: string) => void}> = ({ deeds, onEdit }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><ThumbUpIcon className="w-6 h-6 mr-2 text-indigo-500" />Добрые дела</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold mb-2">Для других</h4>
                <div className="space-y-2">
                    {deeds.filter(d => d.type === 'for_others').map(deed => (
                        <div key={deed.id} className="p-3 bg-indigo-50 rounded-lg flex justify-between items-center group">
                            <span>{deed.text}</span>
                            <button onClick={() => onEdit(deed.text)} className="text-gray-400 hover:text-indigo-600 p-1 rounded-full opacity-0 group-hover:opacity-100">
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Для себя</h4>
                <div className="space-y-2">
                    {deeds.filter(d => d.type === 'for_self').map(deed => (
                         <div key={deed.id} className="p-3 bg-pink-50 rounded-lg flex justify-between items-center group">
                            <span>{deed.text}</span>
                            <button onClick={() => onEdit(deed.text)} className="text-gray-400 hover:text-pink-600 p-1 rounded-full opacity-0 group-hover:opacity-100">
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const PlansSection: React.FC<{plans: Plan[], onEdit: (title: string) => void}> = ({ plans, onEdit }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><CalendarIcon className="w-6 h-6 mr-2 text-teal-500" />Планы</h3>
        <div className="space-y-4">
            {(['month', 'year', 'five_years'] as const).map(timeframe => {
                const timeframePlans = plans.filter(p => p.timeframe === timeframe);
                const titles = { month: 'На месяц', year: 'На год', five_years: 'На 5 лет' };
                return (
                    <div key={timeframe}>
                        <h4 className="font-bold text-gray-700 mb-2">{titles[timeframe]}</h4>
                        {timeframePlans.length > 0 ? timeframePlans.map(plan => (
                             <div key={plan.id} className="p-3 bg-teal-50 rounded-lg flex justify-between items-start group mb-2">
                                <div>
                                    <p className="font-semibold text-teal-800">{plan.title}</p>
                                    {plan.description && <p className="text-sm text-gray-600">{plan.description}</p>}
                                </div>
                                <button onClick={() => onEdit(plan.title)} className="text-gray-400 hover:text-teal-600 p-1 rounded-full opacity-0 group-hover:opacity-100">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )) : <p className="text-sm text-gray-500 italic">Планов пока нет.</p>}
                    </div>
                )
            })}
        </div>
    </div>
);

const InterestsSection: React.FC<{interests: Interest[], onEdit: (title: string) => void}> = ({ interests, onEdit }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center"><SparklesIcon className="w-6 h-6 mr-2 text-orange-500" />Интересы и хобби</h3>
        <div className="space-y-4">
            {interests.map(interest => (
                <div key={interest.id} className="p-4 bg-orange-50 rounded-lg group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-orange-800">{interest.title}</p>
                            <p className="text-sm text-gray-600">{interest.content}</p>
                             <span className="text-xs font-medium mt-2 inline-block px-2 py-0.5 rounded-full bg-orange-200 text-orange-800">{interest.type}</span>
                        </div>
                         <button onClick={() => onEdit(interest.title)} className="text-gray-400 hover:text-orange-600 p-1 rounded-full opacity-0 group-hover:opacity-100 flex-shrink-0">
                            <PencilIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default MemberProfile;