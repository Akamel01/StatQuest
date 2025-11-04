
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Award, Star } from 'lucide-react';
import { useUserProgress } from '../hooks/useUserProgress';
import { BADGES } from '../data/lessons';

const Header: React.FC<{ onHomeClick: () => void }> = ({ onHomeClick }) => {
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const { progress } = useUserProgress();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const nextBadge = BADGES.find(b => !progress.earnedBadges.includes(b.id));

    return (
        <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div onClick={onHomeClick} className="cursor-pointer">
                    <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        StatsQuest
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-sm">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold">{progress.points}</span>
                    </div>
                     <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-sm">
                        <Award className="w-5 h-5 text-indigo-500" />
                        <span className="font-semibold">{progress.earnedBadges.length} / {BADGES.length}</span>
                    </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
             {nextBadge && (
                <div className="w-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-1 bg-primary-500" style={{ width: `${(progress.points / nextBadge.threshold) * 100}%` }}></div>
                </div>
            )}
        </header>
    );
};

export default Header;
