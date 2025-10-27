export enum TaskStatus {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export enum TaskCategory {
    CHORES = 'Дом',
    SHOPPING = 'Покупки',
    APPOINTMENTS = 'Встречи',
    SCHOOL = 'Школа',
    PETS = 'Питомцы',
}

export interface Goal {
    id: string;
    title: string;
    description?: string;
    targetDate: string;
    achieved: boolean;
}

export interface Achievement {
    id: string;
    title: string;
    description?: string;
    date: string;
    type: 'Academic' | 'Personal' | 'Sport';
}

export interface GoodDeed {
    id: string;
    text: string;
    type: 'for_self' | 'for_others';
    date: string;
}

export interface Plan {
    id: string;
    title: string;
    description?: string;
    timeframe: 'month' | 'year' | 'five_years';
}

export type InterestType = 'hobby' | 'movie' | 'music' | 'persona' | 'history' | 'story' | 'joke' | 'meme' | 'love_note';

export interface Interest {
    id: string;
    type: InterestType;
    title: string;
    content: string;
}

export interface Gratitude {
    id: string;
    text: string;
    authorId: string;
    recipientId?: string;
    date: string;
}

export interface FamilyMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    goals: Goal[];
    achievements: Achievement[];
    needs: string[];
    goodDeeds: GoodDeed[];
    plans: Plan[];
    interests: Interest[];
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    assigneeId: string;
    relatedMemberIds?: string[];
    dueDate: string;
    status: TaskStatus;
}

export type View = 
    | { page: 'dashboard' }
    | { page: 'member'; memberId: string }
    | { page: 'gratitude' };
