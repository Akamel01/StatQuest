// FIX: Import React to resolve 'Cannot find namespace React' error.
import React from 'react';

export type TopicId = string;

export type ChartType = 'none' | 'normal_distribution';

export interface Topic {
    id: TopicId;
    title: string;
    content: string;
    chart: ChartType;
}

export interface Unit {
    unitNumber: number;
    title: string;
    duration: string;
    prereqs: string;
    objectives: string[];
    coreTopics: Topic[];
    references: string;
    assessment: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    threshold: number;
}

export interface UserProgress {
    points: number;
    completedTopics: TopicId[];
    earnedBadges: string[];
}
