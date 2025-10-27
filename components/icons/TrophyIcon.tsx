
import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.535-8.085L12 5.25l3.965 5.415A9.75 9.75 0 0116.5 18.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75L12 21m-3.75-3.75h7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.125a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25v.75m-6-3.75h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.125a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v.75m6-3.75h-1.5" />
    </svg>
);
