import React, { useState, useMemo } from 'react';
import { Topic, TopicId } from './types';
import { UNITS } from './data/lessons';
import { UserProgressProvider, useUserProgress } from './hooks/useUserProgress';
import Header from './components/Header';
import UnitListView from './components/LessonList';
import TopicView from './components/LessonView';
import QuizView from './components/QuizView';

type AppView = 'list' | 'topic' | 'quiz';

const AppContent: React.FC = () => {
    const [currentView, setCurrentView] = useState<AppView>('list');
    const [selectedTopicId, setSelectedTopicId] = useState<TopicId | null>(null);
    const { progress } = useUserProgress();

    const handleSelectTopic = (topicId: TopicId) => {
        setSelectedTopicId(topicId);
        setCurrentView('topic');
    };

    const handleStartQuiz = (topicId: TopicId) => {
        setSelectedTopicId(topicId);
        setCurrentView('quiz');
    };
    
    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedTopicId(null);
    };

    const selectedTopic = useMemo(() => {
        if (!selectedTopicId) return null;
        return UNITS.flatMap(u => u.coreTopics).find(t => t.id === selectedTopicId) || null;
    }, [selectedTopicId]);

    const renderContent = () => {
        switch (currentView) {
            case 'topic':
                return selectedTopic && (
                    <TopicView 
                        topic={selectedTopic}
                        onBack={handleBackToList}
                        onStartQuiz={() => handleStartQuiz(selectedTopic.id)}
                    />
                );
            case 'quiz':
                return selectedTopic && (
                    <QuizView
                        topicId={selectedTopic.id}
                        topicTitle={selectedTopic.title}
                        onBack={() => handleSelectTopic(selectedTopic.id)}
                    />
                );
            case 'list':
            default:
                return (
                    <UnitListView 
                        units={UNITS} 
                        onSelectTopic={handleSelectTopic}
                        completedTopics={progress.completedTopics}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
            <Header onHomeClick={handleBackToList} />
            <main className="container mx-auto p-4 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <UserProgressProvider>
            <AppContent />
        </UserProgressProvider>
    );
};

export default App;
