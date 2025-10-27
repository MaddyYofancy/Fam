import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MemberProfile from './components/MemberProfile';
import GratitudeView from './components/GratitudeView';
import { FamilyMember, Task, TaskCategory, TaskStatus, View, Gratitude } from './types';

// Mock Data
const FAMILY_MEMBERS: FamilyMember[] = [
    {
        id: '1', name: 'Анна', role: 'Мама', avatar: 'https://picsum.photos/seed/anna/200',
        goals: [{ id: 'g1', title: 'Прочитать 12 книг за год', targetDate: '2024-12-31', achieved: false, description: 'Одна книга в месяц.' }],
        achievements: [{ id: 'a1', title: 'Лучший работник месяца', date: '2024-05-15', type: 'Personal', description: 'Награда за выдающиеся результаты на работе.' }],
        needs: ['Больше времени для отдыха', 'Помощь с ужином по вторникам'],
        goodDeeds: [
            { id: 'gd1', text: 'Позвонила родителям', type: 'for_others', date: new Date().toISOString() },
            { id: 'gd2', text: 'Посвятила час чтению', type: 'for_self', date: new Date().toISOString() },
        ],
        plans: [
            { id: 'p1', title: 'Семейный отпуск на море', description: 'Накопить и спланировать поездку', timeframe: 'year' },
            { id: 'p2', title: 'Начать учить испанский', description: 'Записаться на курсы', timeframe: 'month' },
        ],
        interests: [
            { id: 'i1', type: 'movie', title: 'Интерстеллар', content: 'Любимый научно-фантастический фильм.'},
            { id: 'i2', type: 'hobby', title: 'Вязание', content: 'Вяжу свитер для Пети.'},
            { id: 'i3', type: 'joke', title: 'Программистский юмор', content: 'Почему программисты путают Хэллоуин и Рождество? Потому что OCT 31 == DEC 25.'},
        ]
    },
    {
        id: '2', name: 'Иван', role: 'Папа', avatar: 'https://picsum.photos/seed/ivan/200',
        goals: [{ id: 'g2', title: 'Пробежать марафон', targetDate: '2024-10-01', achieved: false, description: 'Подготовиться к осеннему марафону.' }],
        achievements: [],
        needs: ['Новые кроссовки для бега'],
        goodDeeds: [{ id: 'gd3', text: 'Починил кран на кухне', type: 'for_others', date: new Date().toISOString() }],
        plans: [{ id: 'p3', title: 'Закончить ремонт в гараже', description: 'До конца лета', timeframe: 'month' }],
        interests: [{ id: 'i4', type: 'history', title: 'Вторая мировая война', content: 'Читаю книгу Энтони Бивора.'}]
    },
    {
        id: '3', name: 'Лена', role: 'Дочь', avatar: 'https://picsum.photos/seed/lena/200',
        goals: [{ id: 'g3', title: 'Получить "5" по математике', targetDate: '2024-06-01', achieved: true, description: 'Успешно сдала итоговый тест.' }],
        achievements: [{ id: 'a2', title: 'Победитель школьной олимпиады', date: '2024-04-20', type: 'Academic', description: 'Олимпиада по литературе.' }],
        needs: ['Помощь с домашним заданием по физике'],
        goodDeeds: [{ id: 'gd4', text: 'Помогла Пете с уроками', type: 'for_others', date: new Date().toISOString() }],
        plans: [],
        interests: [{ id: 'i5', type: 'music', title: 'Taylor Swift - Folklore', content: 'Слушаю на повторе.'}]
    },
    {
        id: '4', name: 'Петя', role: 'Сын', avatar: 'https://picsum.photos/seed/petya/200',
        goals: [],
        achievements: [],
        needs: ['Новый футбольный мяч'],
        goodDeeds: [],
        plans: [],
        interests: [{ id: 'i6', type: 'meme', title: 'Удивленный котик', content: 'Самый смешной мем недели.'}]
    },
];

const TASKS: Task[] = [
    { id: 't1', title: 'Купить продукты', category: TaskCategory.SHOPPING, assigneeId: '1', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), status: TaskStatus.TO_DO, description: "Молоко, хлеб, яйца, курица" },
    { id: 't2', title: 'Забрать Лену из школы', category: TaskCategory.SCHOOL, assigneeId: '2', relatedMemberIds: ['3'], dueDate: new Date().toISOString(), status: TaskStatus.IN_PROGRESS },
    { id: 't3', title: 'Погулять с собакой', category: TaskCategory.PETS, assigneeId: '4', dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), status: TaskStatus.DONE },
    { id: 't4', title: 'Оплатить счета', category: TaskCategory.CHORES, assigneeId: '1', dueDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(), status: TaskStatus.TO_DO },
    { id: 't5', title: 'Запись к врачу', category: TaskCategory.APPOINTMENTS, assigneeId: '3', dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), status: TaskStatus.TO_DO },
    { id: 't6', title: 'Убраться в комнате', category: TaskCategory.CHORES, assigneeId: '3', dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), status: TaskStatus.TO_DO },
];

const GRATITUDES: Gratitude[] = [
    { id: 'gr1', text: 'Спасибо папе за то, что починил мой велосипед!', authorId: '4', recipientId: '2', date: new Date().toISOString() },
    { id: 'gr2', text: 'Огромная благодарность Ане за вкуснейший ужин сегодня вечером.', authorId: '2', recipientId: '1', date: new Date().toISOString() },
    { id: 'gr3', text: 'Лене спасибо за помощь с презентацией!', authorId: '1', recipientId: '3', date: new Date().toISOString() },
];


const App: React.FC = () => {
    const [members, setMembers] = useState<FamilyMember[]>(FAMILY_MEMBERS);
    const [tasks, setTasks] = useState<Task[]>(TASKS);
    const [gratitudes, setGratitudes] = useState<Gratitude[]>(GRATITUDES);
    const [view, setView] = useState<View>({ page: 'dashboard' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (view.page) {
            case 'dashboard':
                return <Dashboard members={members} tasks={tasks} setView={setView} />;
            case 'member':
                const selectedMember = members.find(m => m.id === view.memberId);
                const memberTasks = tasks.filter(t => t.assigneeId === view.memberId || t.relatedMemberIds?.includes(view.memberId));
                if (!selectedMember) return null;
                return <MemberProfile member={selectedMember} tasks={memberTasks} onBack={() => setView({ page: 'dashboard' })} />;
            case 'gratitude':
                return <GratitudeView gratitudes={gratitudes} members={members} />;
            default:
                return <Dashboard members={members} tasks={tasks} setView={setView} />;
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Sidebar 
              setView={setView}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              view={view}
            />
            <main className="lg:ml-72 p-4 sm:p-6 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;