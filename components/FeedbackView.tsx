import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ThumbDownIcon } from './icons/ThumbDownIcon';
import { ThumbUpIcon } from './icons/ThumbUpIcon';

interface FeedbackViewProps {
    onFeedback: (feedback: 'good' | 'bad') => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ onFeedback, onGenerate, isLoading }) => {
    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LightbulbIcon className="w-5 h-5 text-yellow-500" />
                    <span>Это предложение сгенерировано ИИ. Оно полезно?</span>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => onFeedback('good')} 
                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        aria-label="Хороший ответ"
                    >
                        <ThumbUpIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => onFeedback('bad')} 
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        aria-label="Плохой ответ"
                    >
                        <ThumbDownIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onGenerate}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Сгенерировать заново"
                    >
                        <SparklesIcon className="w-5 h-5" />
                        <span>{isLoading ? 'Генерация...' : 'Заново'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackView;
