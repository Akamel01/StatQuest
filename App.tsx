import React, { useState, useMemo, useEffect } from 'react';
import { Unit, TopicId } from './types';
import { fetchUnits } from './data/lessons';
import { UserProgressProvider, useUserProgress } from './hooks/useUserProgress';
import Header from './components/Header';
import UnitListView from './components/LessonList';
import TopicView from './components/LessonView';
import QuizView from './components/QuizView';
import { Loader2 } from 'lucide-react';

type AppView = 'list' | 'topic' | 'quiz';

const AppContent: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentView, setCurrentView] = useState<AppView>('list');
    const [selectedTopicId, setSelectedTopicId] = useState<TopicId | null>(null);
    const { progress } = useUserProgress();

    useEffect(() => {
        const loadUnits = async () => {
            try {
                const fetchedUnits = await fetchUnits();
                setUnits(fetchedUnits);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        loadUnits();
    }, []);

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
        return units.flatMap(u => u.coreTopics).find(t => t.id === selectedTopicId) || null;
    }, [selectedTopicId, units]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-16 h-16 animate-spin text-primary-500" />
                    <span className="ml-4 text-lg">Loading Curriculum...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Failed to Load Curriculum</h2>
                    <p>{error}</p>
                </div>
            );
        }

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
                        units={units} 
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