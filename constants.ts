import { TaskCategory } from './types';

interface CategoryColor {
    bg: string;
    text: string;
    border: string;
}

export const CATEGORY_COLORS: Record<TaskCategory, CategoryColor> = {
    [TaskCategory.CHORES]: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-500',
    },
    [TaskCategory.SHOPPING]: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-500',
    },
    [TaskCategory.APPOINTMENTS]: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-500',
    },
    [TaskCategory.SCHOOL]: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-500',
    },
    [TaskCategory.PETS]: {
        bg: 'bg-pink-100',
        text: 'text-pink-800',
        border: 'border-pink-500',
    },
};
