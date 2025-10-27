import React from 'react';
import { Gratitude, FamilyMember } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { PencilIcon } from './icons/PencilIcon';

interface GratitudeViewProps {
    gratitudes: Gratitude[];
    members: FamilyMember[];
}

const GratitudeView: React.FC<GratitudeViewProps> = ({ gratitudes, members }) => {
    
    const getMemberById = (id: string) => members.find(m => m.id === id);

    const handleEditClick = (text: string) => {
        alert(`Функция редактирования для благодарности "${text.substring(0, 20)}..." в разработке.`);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <HeartIcon className="w-8 h-8 text-pink-500" />
                    Стена Благодарности
                </h1>
                <p className="text-gray-500 mt-1">Место, где можно сказать "спасибо" своим близким.</p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gratitudes.map(gratitude => {
                    const author = getMemberById(gratitude.authorId);
                    const recipient = gratitude.recipientId ? getMemberById(gratitude.recipientId) : null;
                    
                    return (
                        <div key={gratitude.id} className="bg-white rounded-xl shadow-md p-6 group relative hover:shadow-lg transition-shadow">
                             <button 
                                onClick={() => handleEditClick(gratitude.text)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                aria-label="Редактировать благодарность"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                            <div className="flex items-center mb-4">
                                {author && (
                                     <img 
                                        src={author.avatar} 
                                        alt={author.name}
                                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-200"
                                    />
                                )}
                                <div>
                                    <p className="font-bold">{author?.name || 'Аноним'}</p>
                                    {recipient && <p className="text-sm text-gray-500">для {recipient.name}</p>}
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"{gratitude.text}"</p>
                            <p className="text-xs text-gray-400 mt-4 text-right">{new Date(gratitude.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default GratitudeView;
