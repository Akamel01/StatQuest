import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProgress, TopicId } from '../types';
import { BADGES } from '../data/lessons';

const UserProgressContext = createContext<
    {
        progress: UserProgress;
        addPoints: (points: number) => void;
        completeTopic: (topicId: TopicId) => void;
    } | undefined
>(undefined);

const LOCAL_STORAGE_KEY = 'statsquest-progress';

const initialProgress: UserProgress = {
    points: 0,
    completedTopics: [],
    earnedBadges: [],
};

export const UserProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>(() => {
        try {
            const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved) : initialProgress;
        } catch (error) {
            console.error('Failed to load progress from localStorage', error);
            return initialProgress;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
        } catch (error) {
            console.error('Failed to save progress to localStorage', error);
        }
    }, [progress]);
    
    const addPoints = useCallback((points: number) => {
        setProgress(prev => {
            const newPoints = prev.points + points;
            const newBadges = [...prev.earnedBadges];
            
            BADGES.forEach(badge => {
                if (!newBadges.includes(badge.id) && newPoints >= badge.threshold) {
                    newBadges.push(badge.id);
                }
            });
            
            return { ...prev, points: newPoints, earnedBadges: newBadges };
        });
    }, []);

    const completeTopic = useCallback((topicId: TopicId) => {
        setProgress(prev => {
            if (prev.completedTopics.includes(topicId)) {
                return prev;
            }
            addPoints(50); // Award points for completing a topic's quiz for the first time
            return {
                ...prev,
                completedTopics: [...prev.completedTopics, topicId],
            };
        });
    }, [addPoints]);

    return React.createElement(UserProgressContext.Provider, { value: { progress, addPoints, completeTopic } }, children);
};

export const useUserProgress = () => {
    const context = useContext(UserProgressContext);
    if (context === undefined) {
        throw new Error('useUserProgress must be used within a UserProgressProvider');
    }
    return context;
};
